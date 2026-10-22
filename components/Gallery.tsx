"use client";

import { Photo } from "@/components/Photo";
import { galleryOrder, photos, type Photo as PhotoSlot } from "@/lib/photos";
import { useEffect, useId, useRef, useState } from "react";

const galleryPhotos: PhotoSlot[] = galleryOrder.map((id) => photos[id]);

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const captionId = useId();
  const current = index === null ? null : galleryPhotos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => (value === null ? value : (value + 1) % galleryPhotos.length));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) =>
          value === null ? value : (value - 1 + galleryPhotos.length) % galleryPhotos.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  function close() {
    setIndex(null);
    triggerRef.current?.focus();
  }

  return (
    <section className="section section-paper" id="gallery" aria-labelledby="gallery-heading">
      <div className="wrap">
        <p className="eyebrow">Gallery</p>
        <h2 id="gallery-heading">Inside and out</h2>
        <p className="intro">Red brick, reclaimed wood, and steel-frame glass on Flower Street.</p>
        <div className="gallery-grid">
          {galleryPhotos.map((photo, photoIndex) => (
            <button
              key={photo.file}
              type="button"
              className="shot"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setIndex(photoIndex);
              }}
            >
              <Photo photo={photo} />
            </button>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby={captionId}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {current ? (
          <figure className="lightbox-figure">
            <Photo photo={current} alt="" priority />
            <figcaption id={captionId}>{current.alt}</figcaption>
            <p className="lightbox-count">
              {index! + 1} of {galleryPhotos.length}
            </p>
            <div className="lightbox-nav">
              <button type="button" className="btn btn-light" onClick={() => setIndex((index! - 1 + galleryPhotos.length) % galleryPhotos.length)}>
                Previous
              </button>
              <button type="button" className="btn btn-light" onClick={() => setIndex((index! + 1) % galleryPhotos.length)}>
                Next
              </button>
              <button type="button" className="btn btn-ghost" onClick={close}>
                Close
              </button>
            </div>
            <p className="sr-only">Left and right arrow keys move between photographs. Escape closes.</p>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
