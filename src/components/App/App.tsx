import Section from "../Section/Section";
import Container from "../Container/Container";
import toast, { Toaster } from "react-hot-toast";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { getPhotos } from "../../services/photos";
import type { Photo } from "../../types/photo";
import { useState } from "react";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  function handleSelect(photo: Photo) {
    setIsOpen(true);
    setSelectedPhoto(photo);
  }
  async function handleSearch(query: string) {
    try {
      setPhotos([]);
      setIsLoading(true);
      setIsError(false);
      const data = await getPhotos(query);
      if (!data.length) {
        toast.error("No results");
      }
      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Section>
        <Toaster />
        <Container>
          <Form onSubmit={handleSearch}></Form>
          {isLoading && <Loader></Loader>}
          {photos.length >= 1 && (
            <PhotosGallery
              photos={photos}
              modalSelect={handleSelect}
            ></PhotosGallery>
          )}
          {isError && <Text children />}
          {isOpen && (
            <Modal
              onClose={() => {
                setIsOpen(false);
                setSelectedPhoto(null);
              }}
              photo={selectedPhoto}
            ></Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
