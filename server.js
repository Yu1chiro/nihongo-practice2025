const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const quizData = {
  "kuisPertemuan1": [
   {
    "soal": "Kalimat yang paling tepat untuk menyatakan \"Ayah saya suka olahraga\" dalam bahasa Jepang adalah...",
    "pilihan_ganda": [
      "Chichi wa supootsu o suki desu.",
      "Chichi wa supootsu ga suki desu.",
      "Haha wa supootsu ga suki desu.",
      "Chichi ga supootsu wa suki desu."
    ],
    "jawaban": "Chichi wa supootsu ga suki desu."
  },
  {
    "soal": "Kata 「あに」(ani) memiliki arti...",
    "pilihan_ganda": [
      "Adik laki-laki",
      "Kakak perempuan",
      "Kakak laki-laki",
      "Ayah"
    ],
    "jawaban": "Kakak laki-laki"
  },
  {
    "soal": "Lengkapi kalimat berikut: 「ともだち ___ やさしい です。」(Tomodachi ___ yasashii desu.) Partikel yang tepat untuk mengisi bagian yang kosong adalah...",
    "pilihan_ganda": [
      "が (ga)",
      "を (o)",
      "に (ni)",
      "は (wa)"
    ],
    "jawaban": "は (wa)"
  },
  {
    "soal": "Jika seseorang dideskripsikan sebagai 「かっこいい」(kakkoii), artinya orang tersebut...",
    "pilihan_ganda": [
      "Cantik",
      "Baik hati",
      "Keren",
      "Lucu"
    ],
    "jawaban": "Keren"
  },
  {
    "soal": "Perhatikan kalimat: 「あね は りょうり が すきです。」(Ane wa ryouri ga suki desu.) Apa hobi dari kakak perempuan dalam kalimat tersebut?",
    "pilihan_ganda": [
      "Membaca buku",
      "Menonton drama",
      "Memasak",
      "Mendengarkan musik"
    ],
    "jawaban": "Memasak"
  },
  {
    "soal": "Jika seorang guru bertanya 「どんな ひと ですか。」(Donna hito desu ka?), apa informasi yang ingin guru tersebut ketahui?",
    "pilihan_ganda": [
      "Nama orang tersebut",
      "Sifat atau kepribadian orang tersebut",
      "Hobi orang tersebut",
      "Asal negara orang tersebut"
    ],
    "jawaban": "Sifat atau kepribadian orang tersebut"
  },
  {
    "soal": "Manakah di antara kalimat berikut yang secara tata bahasa paling benar?",
    "pilihan_ganda": [
      "Sofu o ongaku ga suki desu.",
      "Sofu wa ongaku o suki desu.",
      "Sofu wa ongaku ga suki desu.",
      "Sofu ga ongaku wa suki desu."
    ],
    "jawaban": "Sofu wa ongaku ga suki desu."
  },
  {
    "soal": "Kata 「きびしい」(kibishii) adalah kata sifat yang paling tepat untuk mendeskripsikan seseorang yang...",
    "pilihan_ganda": [
      "Ceria",
      "Tegas atau disiplin",
      "Cantik",
      "Pendiam"
    ],
    "jawaban": "Tegas atau disiplin"
  },
  {
    "soal": "Bagaimana cara mengatakan \"Adik laki-laki saya lucu/manis\"?",
    "pilihan_ganda": [
      "Otouto wa kakkoii desu.",
      "Imouto wa kawaii desu.",
      "Otouto wa kawaii desu.",
      "Ani wa kawaii desu."
    ],
    "jawaban": "Otouto wa kawaii desu."
  },
  {
    "soal": "「どくしょ」(dokusho) adalah kata benda yang merujuk pada kegiatan...",
    "pilihan_ganda": [
      "Memasak",
      "Olahraga",
      "Membaca buku",
      "Menonton film"
    ],
    "jawaban": "Membaca buku"
  }
  ]
//   more 
// "kuisPertemuan2": []
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/statistik', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'statistik.html'));
});
app.get('/monitoring', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'monitoring.html'));
});

app.get('/api/quiz/:pertemuan', (req, res) => {
  const pertemuan = req.params.pertemuan;
  const quiz = quizData[pertemuan];
  
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ error: 'Quiz tidak ditemukan' });
  }
});

app.get('/api/quiz-list', (req, res) => {
  const quizList = Object.keys(quizData).map(key => ({
    id: key,
    nama: key.replace('kuis', '').replace('Pertemuan', 'Pertemuan '),
    jumlahSoal: quizData[key].length
  }));
  res.json(quizList);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});