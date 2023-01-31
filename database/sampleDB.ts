import { GetDBCategoriesType, GetDBProductsType, GetDBProductType, GetDBPageInfoType, DBCategoryType, DBProductType, DBPageInfoType } from "./types";


export const getDBCategories:GetDBCategoriesType = async () => {
  
  return new Promise((resolve, rejects) => {
    // rejects(new Error("Test Error from getCategoriesFromDB"));
    resolve(categories);
  });

}

export const getDBProducts:GetDBProductsType = async (options) => {

  return new Promise((resolve, rejects) => {
    if(!options) {
      resolve(products);
      return;
    }

    const { limit, offset, categoryID } = options;

    let returnedProducts = products;

    if(categoryID) {
      returnedProducts = returnedProducts.filter((product) => product.categoryID === categoryID);
    }

    let start = offset ?? 0;
    
    
    if(limit) {
      returnedProducts = returnedProducts.slice(start, start + limit);
    }


    // rejects(new Error("Test Error from getProductsFromDB"));

    resolve(returnedProducts);
    
    
  });

}

export const getDBProduct:GetDBProductType = async (id) => {
  
  return new Promise((resolve) => {
    
  const product = products.find((product) => product.id === id);

  if (!product) {
    throw new Error("Product not found on DB Server");
  }

  resolve(product);

  });
}

export const getDBPageInfo:GetDBPageInfoType = async (title) => {

  return new Promise((resolve) => {
    const pageInfo = pageInfos.find((pageInfo) => pageInfo.title === title);
  
    if (!pageInfo) {
      throw new Error(`PageInfo of "${title}" not found on DB Server`);
    }

    resolve(pageInfo);
  
  });

}

/************************************
 *  Data
 */

const products:DBProductType[] = [
  {
    id: '1',
    categoryID: '1',
    name: 'Red Nail Polish',
    shortDescription: 'Classic red nail polish',
    fullDescription: 'This classic red nail polish is a must-have for any nail collection. The long-lasting, chip-resistant formula will leave your nails looking beautiful and shiny. This shade is perfect for any occasion, from casual to formal.',
    price: 5.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '2',
    categoryID: '1',
    name: 'Glitter Nail Polish',
    shortDescription: 'Glitter nail polish for adding sparkle to your nails',
    fullDescription: 'This glitter nail polish is perfect for adding some sparkle to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The glitter particles are fine and will not fall off easily.',
    price: 6.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '3',
    categoryID: '2',
    name: 'Nail Clipper',
    shortDescription: 'Stainless steel nail clipper for trimming nails',
    fullDescription: 'This stainless steel nail clipper is perfect for trimming nails. It features a sharp and precise cutting edge for a clean cut every time. It also has a built-in file for shaping and smoothing nails.',
    price: 3.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '4',
    categoryID: '3',
    name: 'Nail Art Stickers',
    shortDescription: 'Nail art stickers for decorating nails',
    fullDescription: 'This set of nail art stickers includes a variety of designs and patterns, perfect for decorating nails. The stickers are easy to apply and can be used to add a pop of color and interest to any manicure.',
    price: 4.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '5',
    categoryID: '4',
    name: 'Acrylic Nail Kit',
    shortDescription: 'Kit for sculpting and extending nails with acrylic',
    fullDescription: 'This acrylic nail kit is perfect for sculpting and extending nails. It includes a liquid monomer, a powder polymer, and a nail brush for creating a perfect acrylic overlay. It also includes a file and buffer for shaping and smoothing nails.',
    price: 19.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '6',
    categoryID: '5',
    name: 'Cuticle Oil',
    shortDescription: 'Cuticle oil for nourishing and moisturizing cuticles',
    fullDescription: 'This cuticle oil is perfect for nourishing and moisturizing cuticles. It is enriched with natural oils such as jojoba and sweet almond oil, which will keep your cuticles healthy and prevent them from cracking or splitting. It can be used daily for best results.',
    price: 7.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '7',
    categoryID: '5',
    name: 'Nail Strengthener',
    shortDescription: 'Nail strengthener for reinforcing weak nails',
    fullDescription: 'This nail strengthener is perfect for reinforcing weak nails. It is formulated with ingredients such as keratin and biotin, which will strengthen and fortify nails. It can be used as a base coat or as a standalone treatment.',
    price: 9.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '8',
    categoryID: '2',
    name: 'Cuticle Pusher',
    shortDescription: 'Stainless steel cuticle pusher for pushing back cuticles',
    fullDescription: 'This stainless steel cuticle pusher is perfect for pushing back cuticles. It features a pointed tip for precision and a flat end for pushing. It also has a built-in spoon for removing dead skin. It is suitable for use on both natural and artificial nails.',
    price: 2.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '9',
    categoryID: '4',
    name: 'Gel Nail Kit',
    shortDescription: 'Kit for sculpting and extending nails with gel',
    fullDescription: 'This gel nail kit is perfect for sculpting and extending nails. It includes a gel base coat, a gel top coat, and a UV lamp for curing the gel. It also includes a file and buffer for shaping and smoothing nails.',
    price: 34.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '10',
    categoryID: '3',
    name: 'Nail Art Brush Set',
    shortDescription: 'Brush set for creating intricate nail designs',
    fullDescription: 'This brush set includes a variety of brushes for creating intricate nail designs. The set includes brushes for fine lines, shading, and detailing. The brushes are made of high-quality synthetic fibers and have comfortable wooden handles.',
    price: 14.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '11',
    categoryID: '1',
    name: 'French Manicure Kit',
    shortDescription: 'Kit for creating a French manicure',
    fullDescription: 'This French manicure kit includes everything you need to create a classic French manicure. It includes a white nail polish for the tips, a pink nail polish for the base, and a top coat for a glossy finish. It also includes a guide for creating the perfect French manicure.',
    price: 14.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '12',
    categoryID: '2',
    name: 'Nail File',
    shortDescription: 'Glass nail file for shaping and smoothing nails',
    fullDescription: 'This glass nail file is perfect for shaping and smoothing nails. It is made of high-quality glass, making it long-lasting and durable. It is also gentle on nails and will not cause any damage. It can be used on both natural and artificial nails.',
    price: 5.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '13',
    categoryID: '3',
    name: 'Nail Art Stamping Kit',
    shortDescription: 'Kit for creating stamped nail designs',
    fullDescription: 'This nail art stamping kit includes everything you need to create stamped nail designs. It includes a stamping plate with a variety of designs, a stamping polish, and a stamper. The kit also includes a guide for creating the perfect stamped design.',
    price: 19.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '14',
    categoryID: '4',
    name: 'Nail Forms',
    shortDescription: 'Nail forms for sculpting and extending nails',
    fullDescription: 'These nail forms are perfect for sculpting and extending nails. They are made of a flexible and durable material that can be easily shaped to fit any nail. They can be used with any nail enhancement product and are suitable for both professional and home use.',
    price: 9.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '15',
    categoryID: '5',
    name: 'Nail Repair Serum',
    shortDescription: 'Serum for repairing damaged nails',
    fullDescription: 'This nail repair serum is perfect for repairing damaged nails. It is formulated with ingredients such as keratin and biotin, which will strengthen and fortify nails. It can be used as a base coat or as a standalone treatment, it will help to prevent nails from cracking or splitting.',
    price: 12.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '16',
    categoryID: '1',
    name: 'Matte Top Coat',
    shortDescription: 'Matte top coat for creating a matte finish',
    fullDescription: 'This matte top coat is perfect for creating a matte finish on your nails. It can be used over any nail polish to give it a matte finish. The long-lasting formula will keep your nails looking beautiful and matte.',
    price: 7.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '17',
    categoryID: '2',
    name: 'Nail Scissors',
    shortDescription: 'Stainless steel scissors for trimming nails',
    fullDescription: 'These stainless steel scissors are perfect for trimming nails. They feature sharp and precise cutting edges for a clean cut every time. They are also suitable for use on both natural and artificial nails.',
    price: 4.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '18',
    categoryID: '3',
    name: 'Nail Art Rhinestones',
    shortDescription: 'Rhinestones for adding sparkle to your nails',
    fullDescription: 'These rhinestones are perfect for adding sparkle to your nails. They come in a variety of sizes and colors, making them suitable for any nail design. They are easy to apply and can be used with any nail polish or gel.',
    price: 6.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '19',
    categoryID: '4',
    name: 'Polygel Nail Kit',
    shortDescription: 'Kit for sculpting and extending nails with polygel',
    fullDescription: 'This polygel nail kit is perfect for sculpting and extending nails. It includes a polygel base, a polygel top coat, and a UV lamp for curing the gel. It also includes a file and buffer for shaping and smoothing nails.',
    price: 24.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '20',
    categoryID: '5',
    name: 'Hand Cream',
    shortDescription: 'Hand cream for moisturizing and nourishing hands',
    fullDescription: 'This hand cream is perfect for moisturizing and nourishing hands. It is formulated with natural ingredients such as shea butter and vitamin E, which will leave your hands feeling soft and smooth. It can be used daily for best results.',
    price: 8.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '21',
    categoryID: '1',
    name: 'Holographic Nail Polish',
    shortDescription: 'Nail polish with holographic effect',
    fullDescription: 'This nail polish is perfect for adding a holographic effect to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The holographic particles are fine and will not fall off easily.',
    price: 8.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '22',
    categoryID: '2',
    name: 'Nail Buffer',
    shortDescription: 'Buffer for smoothing and shining nails',
    fullDescription: 'This buffer is perfect for smoothing and shining nails. It has four different surfaces for filing, buffing, shining, and smoothing nails. It can be used on both natural and artificial nails.',
    price: 3.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '24',
    categoryID: '4',
    name: 'Nail Extension Glue',
    shortDescription: 'Glue for attaching artificial nails',
    fullDescription: 'This nail extension glue is perfect for attaching artificial nails. It is strong and long-lasting, ensuring that your artificial nails stay securely in place. It dries quickly and can be used with any type of artificial nails.',
    price: 7.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '25',
    categoryID: '5',
    name: 'Nail Growth Serum',
    shortDescription: 'Serum for promoting nail growth',
    fullDescription: 'This nail growth serum is perfect for promoting nail growth. It is formulated with ingredients such as biotin and keratin, which will strengthen and nourish nails. It can be used as a base coat or as a standalone treatment to help nails grow faster.',
    price: 12.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '27',
    categoryID: '2',
    name: 'Nail Clipper',
    shortDescription: 'Stainless steel clipper for trimming nails',
    fullDescription: 'This stainless steel clipper is perfect for trimming nails. It features sharp cutting edges for a clean cut every time. It also has a built-in file for shaping and smoothing nails. It is suitable for use on both natural and artificial nails.',
    price: 4.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '28',
    categoryID: '3',
    name: 'Nail Art Stencils',
    shortDescription: 'Stencils for creating intricate nail designs',
    fullDescription: 'These stencils are perfect for creating intricate nail designs. They come in a variety of shapes and patterns, making them suitable for any nail design. They are easy to use and can be used with any nail polish or gel.',
    price: 7.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '29',
    categoryID: '4',
    name: 'Nail Tips',
    shortDescription: 'Nail tips for sculpting and extending nails',
    fullDescription: 'These nail tips are perfect for sculpting and extending nails. They are made of a durable and flexible material that can be easily shaped to fit any nail. They can be used with any nail enhancement product and are suitable for both professional and home use.',
    price: 14.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '30',
    categoryID: '5',
    name: 'Hand Scrub',
    shortDescription: 'Hand scrub for exfoliating and moisturizing hands',
    fullDescription: 'This hand scrub is perfect for exfoliating and moisturizing hands. It is formulated with natural ingredients such as sugar and coconut oil, which will leave your hands feeling soft and smooth. It can be used weekly for best results.',
    price: 9.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '31',
    categoryID: '1',
    name: 'Nail Art Brush Set',
    shortDescription: 'Set of brushes for creating intricate nail designs',
    fullDescription: 'This set of brushes is perfect for creating intricate nail designs. It includes brushes of different sizes and shapes for fine detailing and overall coverage. They are easy to use and can be used with any nail polish or gel.',
    price: 14.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '32',
    categoryID: '2',
    name: 'Nail Drill',
    shortDescription: 'Electric nail drill for shaping and smoothing nails',
    fullDescription: 'This electric nail drill is perfect for shaping and smoothing nails. It has a variety of attachments for different nail shaping and smoothing tasks. It is suitable for use on both natural and artificial nails and is suitable for both professional and home use.',
    price: 34.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '33',
    categoryID: '3',
    name: 'Nail Art Foil',
    shortDescription: 'Foil for creating metallic nail designs',
    fullDescription: 'This nail art foil is perfect for creating metallic nail designs. It comes in a variety of colors and can be used with any nail polish or gel. It is easy to apply and will give a metallic finish to any nail design.',
    price: 8.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '34',
    categoryID: '4',
    name: 'Acrylic Nail Powder',
    shortDescription: 'Acrylic powder for sculpting and extending nails',
    fullDescription: 'This acrylic powder is perfect for sculpting and extending nails. It can be mixed with liquid to create a paste for sculpting and extending nails. It is suitable for use on both natural and artificial nails and is suitable for both professional and home use.',
    price: 19.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '35',
    categoryID: '5',
    name: 'Nail Cuticle Oil',
    shortDescription: 'Oil for moisturizing and nourishing cuticles',
    fullDescription: 'This cuticle oil is perfect for moisturizing and nourishing cuticles. It is formulated with natural ingredients such as jojoba oil and vitamin E, which will leave your cuticles looking healthy and hydrated. It can be used daily for best results.',
    price: 9.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '36',
    categoryID: '1',
    name: 'Nail Art Stickers',
    shortDescription: 'Stickers for decorating nails',
    fullDescription: 'These stickers are perfect for decorating nails. They come in a variety of designs and patterns, making them suitable for any nail design. They are easy to apply and can be used with any nail polish or gel.',
    price: 5.99,
    imageUrl: '/images/002.jpg'
  },
  {
    id: '37',
    categoryID: '2',
    name: 'Nail File',
    shortDescription: 'File for shaping and smoothing nails',
    fullDescription: 'This file is perfect for shaping and smoothing nails. It has different surfaces for filing, buffing, shining, and smoothing nails. It can be used on both natural and artificial nails and is suitable for both professional and home use.',
    price: 2.99,
    imageUrl: '/images/003.jpg'
  },
  {
    id: '38',
    categoryID: '3',
    name: 'Nail Art Glitter',
    shortDescription: 'Glitter for adding sparkle to your nails',
    fullDescription: 'This glitter is perfect for adding sparkle to your nails. It comes in a variety of colors and can be used with any nail polish or gel. It is easy to apply and will give a sparkle finish to any nail design.',
    price: 4.99,
    imageUrl: '/images/004.jpg'
  },
  {
    id: '39',
    categoryID: '4',
    name: 'Gel Nail Kit',
    shortDescription: 'Kit for sculpting and extending nails with gel',
    fullDescription: 'This gel nail kit is perfect for sculpting and extending nails. It includes a gel base, a gel top coat, and a UV lamp for curing the gel. It also includes a file and buffer for shaping and smoothing nails. It is suitable for both professional and home use.',
    price: 29.99,
    imageUrl: '/images/001.jpg'
  },
  {
    id: '40',
    categoryID: '5',
    name: 'Hand Lotion',
    shortDescription: 'Lotion for moisturizing and nourishing hands',
    fullDescription: 'This hand lotion is perfect for moisturizing and nourishing hands. It is formulated with natural ingredients such as cocoa butter and vitamin E, which will leave your hands feeling soft and smooth. It can be used daily for best results.',
    price: 7.99,
    imageUrl: '/images/002.jpg'
  }
]

const categories:DBCategoryType[]  = [
  {
    id: '1',
    name: 'Nail Polish',
    slug: 'nail-polish',
    description: 'A wide variety of nail polishes in different shades and finishes',
    imageUrl: '/images/001.jpg'
  },
  {
    id: '2',
    name: 'Nail Tools',
    slug: 'nail-tools',
    description: 'Essential tools for shaping and maintaining nails',
    imageUrl: '/images/002.jpg'
  },
  {
    id: '3',
    name: 'Nail Art',
    slug: 'nail-art',
    description: 'Decorations and embellishments for creating unique nail designs',
    imageUrl: '/images/003.jpg'
  },
  {
    id: '4',
    name: 'Nail Extensions',
    slug: 'nail-extensions',
    description: 'Products for extending and sculpting nails',
    imageUrl: '/images/004.jpg'
  },
  {
    id: '5',
    name: 'Nail Care',
    slug: 'nail-care',
    description: 'Products for maintaining the health and appearance of nails',
    imageUrl: '/images/001.jpg'
  }
]


const pageInfos:DBPageInfoType[]  = [
  {
    id: '1',
    title: 'Home',
    description: 'Nail art supplies and accessories',
    subtitle: "We offer a wide selection of nail products, including polishes, tools, and accessories."
  },
  {
    id: '2',
    title: "About",
    description: "About us",
    subtitle: "Our team, our misson, and our values."
  },
  {
    id: '3',
    title: "Shop",
    description: "Shop for premium quality nail supplies at our online store. Find polishes, tools, and everything you need for stunning nail art. Order now.",
    subtitle: "Transform your nails with our top-notch nail supplies."
  }
]