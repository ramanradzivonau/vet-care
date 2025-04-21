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

export const doctorsMockData = [
  {
    id: "1",
    fullName: "Артур Ковалевич",
    img: "https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/703/c500/b944f216-8851-4679-b73c-99fa8c01e658.jpeg",
    rating: 4.4,
    clinic: {
      id: "1-1-1",
      name: "ДокторВет",
      location: {
        latitude: 53.873802,
        longitude: 27.502069,
      },
    },
    categoies: ["1"],
    tags: ["Поведение", "Питание", "Лечение"],
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации соответствующий условий активизации. ",
  },
  {
    id: "2",
    fullName: "Дарья Станкевич",
    img: "https://vetandlife.ru/wp-content/uploads/2021/08/7fa31f2c79ac50b5ce2a76b5eaa2c74b.jpg",
    rating: 4.9,
    clinic: {
      id: "1-1-2",
      name: "ДокторВет",
      location: {
        latitude: 53.873802,
        longitude: 27.502069,
      },
    },
    categoies: ["1", "2"],
    tags: ["Операции", "Стерелизация"],
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации соответствующий условий активизации. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение существенных финансовых и административных условий.",
  },
  {
    id: "3",
    fullName: "Артур Ковалевич",
    img: "https://cdn1.ozonusercontent.com/s3/club-storage/images/article_image_752x940/703/c500/b944f216-8851-4679-b73c-99fa8c01e658.jpeg",
    rating: 4.4,
    clinic: {
      id: "1-1-1",
      name: "ДокторВет",
      location: {
        latitude: 53.873802,
        longitude: 27.502069,
      },
    },
    categoies: ["1"],
    tags: ["Поведение", "Питание", "Лечение"],
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации соответствующий условий активизации. ",
  },
  {
    id: "4",
    fullName: "Дарья Станкевич",
    img: "https://vetandlife.ru/wp-content/uploads/2021/08/7fa31f2c79ac50b5ce2a76b5eaa2c74b.jpg",
    rating: 4.9,
    clinic: {
      id: "1-1-2",
      name: "ДокторВет",
      location: {
        latitude: 53.873802,
        longitude: 27.502069,
      },
    },
    categoies: ["1", "2"],
    tags: ["Операции", "Стерелизация"],
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации соответствующий условий активизации. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение существенных финансовых и административных условий.",
  },
];
