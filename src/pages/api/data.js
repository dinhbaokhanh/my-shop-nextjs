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
            image: ['https://cdn.shopify.com/s/files/1/0529/2641/5045/products/polka_BD2022_top_900x.png?v=1643270830',
                    'https://cdn.shopify.com/s/files/1/0529/2641/5045/products/polka_BD2022_set_900x.png?v=1643270830'
        ],
            categories: 'Memorials',
            description: 'This product is to celebrate the birthday of Omaru Polka from hololive.',
            setDetails: "This is the complete set of merch to celebrate the birthday of Omaru Polka.",
            content: "・3 Birthday Merch and bonus for all set: Polaroid-style bromide card with handwritten autograph from Omaru Polka. (Art by 木なこ)",
            price: 499000,
            rating: 4.5,
            brand: 'Hololive',
            NumReviews: 8,
            countInStock: 20,
        },
        {
            name: 'Nekomata Okayu Birthday Celebration 2022',
            slug: 'nekomata_okayu_birthday_celebration_2022',
            image: ['https://cdn.shopify.com/s/files/1/0529/2641/5045/products/nekomataokayu_birthday2022_top_0215_1200x.png?v=1645172816',
                    'https://cdn.shopify.com/s/files/1/0529/2641/5045/products/nekomataokayu_birthday2022_full_0218_1000x.png?v=1645172815'],
            categories: 'Memorials',
            description: 'This product is to celebrate the birthday of Nekomata Okayu from hololive.',
            setDetails: "This is the complete set of merch to celebrate the birthday of Nekomata Okayu.",
            content: "・3 Birthday Merch and bonus for all set: Postcard with handwritten autograph from Nekomata Okayu. (Art by 神岡ちろる)",
            price: 585000,
            rating: 5.0,
            brand: 'Hololive',
            NumReviews: 12,
            countInStock: 9,
        },
        {
            name: 'Towa 1st EP "Scream"',
            slug: 'towa_1st_ep_scream',
            image: ['https://cdn.shopify.com/s/files/1/0529/2641/5045/products/1227_3af82151-a94e-4450-a578-40ef02cff043_1200x.png?v=1640687949',
                    'https://cdn.shopify.com/s/files/1/0529/2641/5045/products/1227_900x.png?v=1640687948'],
            categories: 'CDs',
            description: 'This is the CD sales to celebrate the first EP of Tokoyami Towa.',
            setDetails: "Some of the tracks that are featured in this CD will be streamed as digital contents prior to shipping.",
            content: "Number of CDs: 1 and features 6 tracks",
            price: 440000,
            rating: 5,
            brand: 'Hololive',
            NumReviews: 10,
            countInStock: 15,
        },
        {
            name: 'Hoshimachi Suisei 1st Album "Still Still Stellar"',
            slug: 'hoshimachi_suisei_1st_album_still_still_stellar',
            image: ['https://cdn.shopify.com/s/files/1/0529/2641/5045/products/1220__1st_StillStillStellar_fa5fe8e6-a2f8-483a-a4f7-464fc9f8efdd_1200x.png?v=1639564807',
                    'https://cdn.shopify.com/s/files/1/0529/2641/5045/products/1220__1st_StillStillStellar_fa5fe8e6-a2f8-483a-a4f7-464fc9f8efdd_1200x.png?v=1639564807'],
            description: 'This is the first CD album of Hosgimachi Suisei.',
            setDetails: "The album contains 12 tracks including several of her previous songs and songs that are written especially for this album.",
            content: "None",
            categories: 'CDs',
            price: 649000,
            rating: 4.5,
            brand: 'Hololive',
            NumReviews: 17,
            countInStock: 2,
        },

    ]
}

export default data;