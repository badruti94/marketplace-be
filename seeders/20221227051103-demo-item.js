'use strict';

/** @type {import('sequelize-cli').Migration} */


const items = [
  {
    name: 'IT Dual Port Car Charger PD PPS 48W - Black',
    description: `Let’s Charge with IT Dual Port Car Charger PD PPS 48W, pengisi daya untuk penggunaan di dalam mobil hingga 48 Watt untuk mendukung gaya hidup yang mobile dan penuh dengan kesibukan..`,
    price: 349000,
    image: 'https://res.cloudinary.com/dmzuc1ot0/image/upload/v1672116188/egqnloq73liekiwq5zul.jpg',
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'IT Plug IT 20 Cube Version - White',
    description: ` wall charger yang memaksimalkan produktivitas sehari-hari, apapun tipe handset yang digunakan. Isi daya dengan fitur Power Delivery fast charging hingga 50% hanya dalam 30 menit.`,
    price: 189000,
    image: 'https://res.cloudinary.com/dmzuc1ot0/image/upload/v1672116225/ekazwya3xx9ibgbzlnzw.webp',
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'IT Power Connector USB C to Lightning Cable - White',
    description: `Let's connect with IT Power Connector USB C to Lightning yang dirancang untuk kemudahan aktivitas sehari-hari bagi pengguna perangkat Apple. Bersertifikasi MFI dari Apple dan panjang 120cm, IT Power Connector telah dilengkapi strap kabel built-in dan pouch.`,
    price: 299000,
    image: 'https://res.cloudinary.com/dmzuc1ot0/image/upload/v1672116235/gc2lg6mvq02m1zxtv570.jpg',
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'IT Power Connector USB C to Lightning Cable - Black',
    description: `Let's connect with IT Power Connector USB C to Lightning yang dirancang untuk kemudahan aktivitas sehari-hari bagi pengguna perangkat Apple. Bersertifikasi MFI dari Apple dan panjang 120cm, IT Power Connector telah dilengkapi strap kabel built-in dan pouch.`,
    price: 299000,
    image: 'https://res.cloudinary.com/dmzuc1ot0/image/upload/v1672116246/u9vitnmkxsczgw7ilvmy.jpg',
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lamina Tempered Glass iPhone 14 - Clear',
    description: `Lamina Tempered Glass iPhone adalah temper glass untuk smartphone kesayangan Anda. Memiliki ketebalan 0,22 mm agar memberikan proteksi tingkat tinggi. Lapisan oleophobic memberikan perlindungan terhadap sidik jari & telapak tangan yang berkeringat.`,
    price: 359000,
    image: 'https://res.cloudinary.com/dmzuc1ot0/image/upload/v1672116254/o2scfzggoyzxll8siure.webp',
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('items', items);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('items', null, {});
  }
};
