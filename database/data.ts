const data = [
    {
      id: "1",
      name: 'Nail Polish Set',
      shortDescription: 'A set of 12 vibrant nail polishes',
      fullDescription: 'This set includes 12 highly pigmented and long-lasting nail polishes in a variety of shades. Perfect for both professional use and at-home manicures.',
      price: 19.99,
      imageUrl: '/images/001.jpg'
    },
    {
      id: "2",
      name: 'Acrylic Nail Kit',
      shortDescription: 'Complete kit for creating acrylic nails',
      fullDescription: 'This kit includes everything you need to create beautiful acrylic nails at home. It includes a liquid monomer, a powder polymer, a brush, and a file. With this kit, you can create salon-quality acrylic nails in the comfort of your own home.',
      price: 29.99,
      imageUrl: '/images/002.jpg'
    },
    {
      id: "3",
      name: 'Gel Nail Polish',
      shortDescription: 'Long-lasting gel nail polish in a variety of shades',
      fullDescription: 'This gel nail polish provides a long-lasting and glossy finish. The polish is easy to apply and cure under a UV lamp. It is available in a variety of shades to suit any occasion.',
      price: 14.99,
      imageUrl: '/images/003.jpg'
    },
    {
      id: "4",
      name: 'Nail Art Stamping Plate',
      shortDescription: 'Stamping plate for creating intricate nail art designs',
      fullDescription: 'This stamping plate includes a variety of intricate designs that can be used to create unique and professional-looking nail art. The plate is easy to use and can be used with any stamping polish.',
      price: 9.99,
      imageUrl: '/images/004.jpg'
    },
    {
      id: "5",
      name: 'Nail Buffer Block',
      shortDescription: 'Buffer block for smoothing and shaping nails',
      fullDescription: 'This buffer block is perfect for smoothing and shaping nails before applying polish. It can be used to file, buff, and shine nails to a natural finish.',
      price: 3.99,
      imageUrl: '/images/001.jpg'
    },
    {
      id: "6",
      name: 'Nail File Set',
      shortDescription: 'Set of 6 different nail files',
      fullDescription: 'This set includes 6 different types of nail files: coarse, medium, fine, glass, crystal, and buffer. Each file is designed for a specific purpose, allowing you to achieve a professional-looking manicure at home.',
      price: 7.99,
      imageUrl: '/images/002.jpg'
    },
    {
      id: "7",
      name: 'Nail Clipper Set',
      shortDescription: 'Set of 2 clippers for finger and toe nails',
      fullDescription: 'This set includes 2 different clippers, one for finger nails and one for toe nails. Both clippers feature precision-ground edges for clean and easy cutting.',
      price: 5.99,
      imageUrl: '/images/003.jpg'
    },

    {
        id: "8",
        name: 'Cuticle Pusher and Scraper Set',
        shortDescription: 'Set of 2 tools for pushing and scraping cuticles',
        fullDescription: 'This set includes 2 tools: a cuticle pusher and a cuticle scraper. Both tools are made of stainless steel and feature comfortable wooden handles. They are perfect for pushing and scraping cuticles to achieve a neat and polished look.',
        price: 7.99,
        imageUrl: '/images/004.jpg'
      },
      {
        id: "9",
        name: 'Nail Dryer',
        shortDescription: 'UV nail dryer for drying gel nail polish',
        fullDescription: 'This UV nail dryer is perfect for drying gel nail polish. It features a large lamp and a timer, allowing you to cure your nails quickly and evenly. It is easy to use and perfect for both professional and home use.',
        price: 39.99,
        imageUrl: '/images/001.jpg'
      },
      {
        id: "10",
        name: 'Nail Polish Remover',
        shortDescription: 'Acetone-free nail polish remover',
        fullDescription: 'This acetone-free nail polish remover is gentle on nails and cuticles. It effectively removes nail polish without leaving any residue. It is also infused with nourishing ingredients to keep your nails healthy.',
        price: 7.99,
        imageUrl: '/images/002.jpg'
      },
      {
        id: "11",
        name: 'Nail Strengthener',
        shortDescription: 'Nail strengthener to repair and strengthen nails',
        fullDescription: 'This nail strengthener is formulated to repair and strengthen nails. It is infused with nourishing ingredients such as keratin and calcium to promote healthy and strong nails. It can be used as a base coat or as a treatment.',
        price: 12.99,
        imageUrl: '/images/003.jpg'
      },
      {
        id: "12",
        name: 'Nail Art Brush Set',
        shortDescription: 'Set of 7 brushes for creating intricate nail art designs',
        fullDescription: 'This set includes 7 different brushes for creating intricate nail art designs. The brushes are made of high-quality synthetic fibers and have comfortable wooden handles. They are perfect for both professional and personal use.',
        price: 14.99,
        imageUrl: '/images/004.jpg'
      },

      {
        id: "13",
        name: 'Nail Sticker Set',
        shortDescription: 'Set of various nail stickers for decorating nails',
        fullDescription: 'This set includes a variety of nail stickers in different designs and patterns, perfect for decorating nails. The stickers are easy to apply and can be used to add a pop of color and interest to any manicure.',
        price: 9.99,
        imageUrl: '/images/001.jpg'
      },
      {
        id: "14",
        name: 'Nail Glitter Set',
        shortDescription: 'Set of various nail glitters for decorating nails',
        fullDescription: 'This set includes a variety of nail glitters in different shapes, sizes, and colors, perfect for adding sparkle and shine to any manicure. The glitters can be used alone or mixed with nail polish for a custom look.',
        price: 14.99,
        imageUrl: '/images/002.jpg'
      },
      {
        id: "15",
        name: 'Nail Extension Gel',
        shortDescription: 'Gel for extending nails',
        fullDescription: 'This extension gel is perfect for extending nails to create a longer and more elegant look. It is easy to apply and cure under a UV lamp, and can be sculpted and shaped to create any desired length or shape.',
        price: 24.99,
        imageUrl: '/images/003.jpg'
      },
      {
        id: "16",
        name: 'Nail Forms',
        shortDescription: 'Nail forms for sculpting acrylic or gel nails',
        fullDescription: 'These nail forms are perfect for sculpting acrylic or gel nails. They are easy to use and can be adjusted to fit any nail size or shape. They are also reusable, making them a cost-effective option for any salon or home use.',
        price: 9.99,
        imageUrl: '/images/004.jpg'
      },
      {
        id: "17",
        name: 'Nail Dipping Powder',
        shortDescription: 'Dipping powder for creating a long-lasting manicure',
        fullDescription: 'This dipping powder is perfect for creating a long-lasting manicure. It is applied by dipping nails into the powder, which is then cured under a UV lamp. It is available in a variety of shades and can be used to create natural or colored nails.',
        price: 19.99,
        imageUrl: '/images/001.jpg'
      },
      {
        id: "18",
        name: 'Nail Drill',
        shortDescription: 'Professional nail drill for filing and shaping nails',
        fullDescription: 'This professional nail drill is perfect for filing and shaping nails. It features a variety of attachments for different tasks such as filing, buffing, and polishing. It is easy to use and perfect for both professional and home use.',
        price: 79.99,
        imageUrl: '/images/002.jpg'
      },

      {
        id: "20",
        name: 'Nail Polish Remover Pads',
        shortDescription: 'Pre-moistened pads for removing nail polish',
        fullDescription: 'These pre-moistened pads make removing nail polish quick and easy. They are infused with acetone or non-acetone remover and are gentle on nails and cuticles. They are perfect for use at home or on-the-go.',
        price: 5.99,
        imageUrl: '/images/003.jpg'
      },
      {
        id: "21",
        name: 'Nail Art Rhinestones',
        shortDescription: 'Rhinestones for decorating nails',
        fullDescription: 'This set includes a variety of rhinestones in different shapes, sizes, and colors, perfect for adding sparkle and shine to any manicure. The rhinestones can be used alone or mixed with other nail art elements for a custom look.',
        price: 7.99,
        imageUrl: '/images/004.jpg'
      },
      {
        id: "22",
        name: 'Nail Tape',
        shortDescription: 'Nail tape for creating geometric designs',
        fullDescription: 'This nail tape is perfect for creating geometric designs on nails. It is easy to use and can be cut into different shapes and sizes to create unique and professional-looking designs. It is suitable for use with both natural and artificial nails.',
        price: 4.99,
        imageUrl: '/images/001.jpg'
      },
      {
        id: "23",
        name: 'Nail Extension Brush',
        shortDescription: 'Brush for sculpting and shaping acrylic or gel nails',
        fullDescription: 'This extension brush is perfect for sculpting and shaping acrylic or gel nails. It is made of high-quality synthetic fibers and has a comfortable wooden handle. It is suitable for both professional and home use.',
        price: 7.99,
        imageUrl: '/images/002.jpg'
      },

      {
        id: "25",
        name: 'Nail Art Foil',
        shortDescription: 'Foil for creating unique nail designs',
        fullDescription: 'This nail art foil can be used to create unique and eye-catching designs on nails. It can be cut into various shapes and sizes and applied with a foil adhesive. The foil comes in a variety of colors and patterns to suit any design.',
        price: 6.99,
        imageUrl: '/images/003.jpg'
      },
      {
        id: "26",
        name: 'Nail Art Stencils',
        shortDescription: 'Stencils for creating intricate designs on nails',
        fullDescription: 'This set of stencils includes a variety of intricate designs that can be used to create unique and professional-looking nail art. The stencils are easy to use and can be used with any nail polish or gel to create a perfect design.',
        price: 12.99,
        imageUrl: '/images/004.jpg'
      },
      {
        id: "27",
        name: 'Nail Art Dotting Tool',
        shortDescription: 'Dotting tool for creating polka dots and other designs',
        fullDescription: 'This dotting tool is perfect for creating polka dots and other designs on nails. It features two different sized tips for creating different size dots. It can be used with any nail polish or gel to create a perfect design.',
        price: 5.99,
        imageUrl: '/images/001.jpg'
      },
]

export default data;