import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'ADMIN',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: true,
        },
        {
            name: 'Khanh',
            email: 'user@gmail.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Omaru Polka Birthday Celebration 2022',
            slug: 'omaru_polka_birthday_celebration_2022',
            image: '//images/polka_BD2022_top_400x.png',
            productImg: '//images/polka_BD2022_top_400x.png',
            category: 'Memorials',
            description: 'This product is to celebrate the birthday of Omaru Polka from hololive.',
            setDetails: "This is the complete set of merch to celebrate the birthday of Omaru Polka.",
            content: "・3 Birthday Merch and bonus for all set: Polaroid-style bromide card with handwritten autograph from Omaru Polka. (Art by 木なこ)",
            price: 499000,
            rating: 4.5,
            brand: 'Hololive',
            NumReviews: 8,
            countInStock: 20,
            isFeatured: true,
        },
        {
            name: 'Nekomata Okayu Birthday Celebration 2022',
            slug: 'nekomata_okayu_birthday_celebration_2022',
            image: '//images/nekomataokayu_birthday2022_top_0215_800x.png',
            productImg: '//images/nekomataokayu_birthday2022_top_0215_800x.png',
            category: 'Memorials',
            description: 'This product is to celebrate the birthday of Nekomata Okayu from hololive.',
            setDetails: "This is the complete set of merch to celebrate the birthday of Nekomata Okayu.",
            content: "・3 Birthday Merch and bonus for all set: Postcard with handwritten autograph from Nekomata Okayu. (Art by 神岡ちろる)",
            price: 585000,
            rating: 5.0,
            brand: 'Hololive',
            NumReviews: 12,
            countInStock: 9,
            isFeatured: true,
        },
        {
            name: 'Towa 1st EP "Scream"',
            slug: 'towa_1st_ep_scream',
            image: '//images/Towa_scream_EP.png',
            productImg: '//images/Towa_scream_EP.png',
            category: 'CDs',
            description: 'This is the CD sales to celebrate the first EP of Tokoyami Towa.',
            setDetails: "Some of the tracks that are featured in this CD will be streamed as digital contents prior to shipping.",
            content: "Number of CDs: 1 and features 6 tracks",
            price: 440000,
            rating: 5,
            brand: 'Hololive',
            NumReviews: 10,
            countInStock: 15,
            isFeatured: false,
        },
        {
            name: 'Hoshimachi Suisei 1st Album "Still Still Stellar"',
            slug: 'hoshimachi_suisei_1st_album_still_still_stellar',
            image: '//images/SSStellar-Sales.jpg',
            productImg: '//images/SSStellar-Sales.jpg',
            description: 'This is the first CD album of Hosgimachi Suisei.',
            setDetails: "The album contains 12 tracks including several of her previous songs and songs that are written especially for this album.",
            content: "None",
            category: 'CDs',
            price: 649000,
            rating: 4.5,
            brand: 'Hololive',
            NumReviews: 17,
            countInStock: 2,
            isFeatured: true,
        },

    ]
}

export default data;