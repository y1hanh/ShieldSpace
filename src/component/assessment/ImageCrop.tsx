import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop, { Crop, centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import { createWorker, WorkerOptions } from 'tesseract.js';
import 'react-image-crop/dist/ReactCrop.css';
import CropIcon from '@mui/icons-material/Crop';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageCrop = ({
  fileInputRef,
  onImageCropped,
  onTextExtracted,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageCropped?: (croppedImage: string) => void;
  onTextExtracted?: (text: string) => void;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractionProgress, setExtractionProgress] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setCroppedImage(null);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  }, []);

  function generateCroppedImage(crop: PixelCrop) {
    if (!imgRef.current || !crop) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<string>(resolve => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, 'image/jpeg');
    });
  }

  const handleCropImage = async () => {
    if (!completedCrop) return;

    try {
      const croppedImageUrl = await generateCroppedImage(completedCrop);
      if (croppedImageUrl) {
        setCroppedImage(croppedImageUrl);
        if (onImageCropped) {
          onImageCropped(croppedImageUrl);
        }
        handleTextExtract(croppedImageUrl);
      }
      setModalOpen(false);
    } catch (e) {
      console.error('Error cropping image: ', e);
    }
  };

  const handleTextExtract = async (imageUrl: string) => {
    setIsExtracting(true);
    setExtractedText('');

    try {
      const worker = await createWorker('eng', 1, {
        logger: progress => {
          if (progress.status === 'recognizing text') {
            setExtractionProgress(progress.progress * 100);
          }
        },
      });

      const { data } = await worker.recognize(imageUrl);
      setExtractedText(data.text);

      if (onTextExtracted) {
        onTextExtracted(data.text);
      }

      await worker.terminate();
    } catch (error) {
      console.error('Error extracting text:', error);
      setExtractedText('Error extracting text. Please try again.');
    } finally {
      setIsExtracting(false);
      setExtractionProgress(0);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (!croppedImage) {
      clearImagePreview();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {croppedImage && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            mb: 2,
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={croppedImage}
            alt="Cropped Preview"
            sx={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'contain',
              borderRadius: '12px',
              backgroundColor: '#fff',
            }}
          />
          <IconButton
            onClick={clearImagePreview}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            ✕
          </IconButton>
        </Box>
      )}

      {/* Text extraction progress */}
      {isExtracting && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={extractionProgress}
            size={24}
            sx={{ mr: 2, color: '#FF9800' }}
          />
          <Typography>Extracting text from image... {Math.round(extractionProgress)}%</Typography>
        </Box>
      )}

      {/* Crop Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent
          sx={{
            position: 'relative',
            padding: '20px',
            bgcolor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {imagePreview && (
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
              className="react-crop-container"
            >
              <img
                ref={imgRef}
                src={imagePreview}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ maxHeight: '70vh', maxWidth: '100%' }}
              />
            </ReactCrop>
          )}

          <canvas
            ref={previewCanvasRef}
            style={{
              display: 'none',
              width: completedCrop?.width ?? 0,
              height: completedCrop?.height ?? 0,
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'flex-end',
            padding: '16px 24px',
            bgcolor: '#f5f5f5',
          }}
        >
          <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={handleCropImage}
            sx={{
              bgcolor: '#FF9800',
              '&:hover': {
                bgcolor: '#F57C00',
              },
            }}
          >
            Crop
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
