import { CATEGORIES } from "./types";

export const categories: { id: string; label: string; category: CATEGORIES }[] =
  [
    {
      id: "1",
      label: "Общая практика",
      category: CATEGORIES.THERAPISTS,
    },
    {
      id: "2",
      label: "Хирургия",
      category: CATEGORIES.SURGEONS,
    },
    {
      id: "3",
      label: "Офтальмология",
      category: CATEGORIES.OPHTHALMOLOGISTS,
    },
    {
      id: "4",
      label: "Дерматология",
      category: CATEGORIES.DERMATOLOGISTS,
    },
    {
      id: "5",
      label: "Кардиология",
      category: CATEGORIES.CARDIOLOGISTS,
    },
    {
      id: "6",
      label: "Стоматология",
      category: CATEGORIES.DENTISTS,
    },
    {
      id: "7",
      label: "Травмотология",
      category: CATEGORIES.ORTHOPEDISTS,
    },
    {
      id: "8",
      label: "Экзотология",
      category: CATEGORIES.EXOTOLOGISTS,
    },
  ];

export const doctors = [
  {
    categoryId: "1",
    doctors: [
      {
        id: "1",
        fullName: "Артур Ковалевич",
        img: "https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/703/c500/b944f216-8851-4679-b73c-99fa8c01e658.jpeg",
        rating: 4.8,
        clinic: {
          id: "1-1-1",
          name: "ДокторВет",
          location: {
            latitude: 53.873802,
            longitude: 27.502069,
          },
        },
      },
      {
        id: "2",
        fullName: "Дарья Станкевич",
        img: "https://vetandlife.ru/wp-content/uploads/2021/08/7fa31f2c79ac50b5ce2a76b5eaa2c74b.jpg",
        rating: 4.6,
        clinic: {
          id: "1-1-2",
          name: "ДокторВет",
          location: {
            latitude: 53.873802,
            longitude: 27.502069,
          },
        },
      },
    ],
  },
  {
    categoryId: "2",
    doctors: [
      {
        id: "2",
        fullName: "Дарья Станкевич",
        img: "https://vetandlife.ru/wp-content/uploads/2021/08/7fa31f2c79ac50b5ce2a76b5eaa2c74b.jpg",
        rating: 4.6,
        clinic: {
          id: "1-1-2",
          name: "ДокторВет",
          location: {
            latitude: 53.873802,
            longitude: 27.502069,
          },
        },
      },
    ],
  },
];
