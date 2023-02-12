import { GetDBCategoriesType, AddDBCategoryType, GetDBProductsType, GetDBProductType, GetDBAboutHtmlTextType, GetDBPageInfoType, DBCategoryType, DBProductType, DBPageInfoType, DBProductGroupType } from "./types";


export const getDBCategories:GetDBCategoriesType = async () => {
  
  return new Promise((resolve, rejects) => {
    // rejects(new Error("Test Error from getCategoriesFromDB"));
    resolve(categories);
  });

}

export const addDBCategory:AddDBCategoryType = async (newCategory) => {
  return new Promise((resolve, rejects) => {
    // rejects(new Error("Test Error from addCategoryToDB"));

    const newCategoryID = categories.length + 1;

    const newCategoryInDB = {
      ...newCategory,
      id: newCategoryID + '',
      slug: newCategory.name.toLowerCase().replace(/ /g, '-'),
    }

    categories.push(newCategoryInDB);
    
    resolve(newCategoryInDB);
  });
}


export const getDBProducts:GetDBProductsType = async (options) => {

  return new Promise((resolve, rejects) => {
    

    const { limit, offset, categoryID, price, sort } = options;

    let returnedProducts = products;

    if(categoryID) {
      returnedProducts = returnedProducts.filter((product) => {
        if(Array.isArray(product)) {
          const mainProduct = product.find((p) => p.mainProduct);

          if(!mainProduct) {
            throw new Error(`Product group "${product[0].name}" does not have a main product`);
          }

          return product.find((p) => p.mainProduct)?.categoryID === categoryID;
        }
        else {
          return product.categoryID === categoryID;
        }

      });
    }

    if(price) {
      returnedProducts = returnedProducts.filter((product) => {
        if(Array.isArray(product)) {
          const mainProduct = product.find((p) => p.mainProduct);

          if(!mainProduct) {
            throw new Error(`Product group "${product[0].name}" does not have a main product`);
          }

          return mainProduct.price >= price.min && mainProduct.price <= price.max;

        }
        else {
          return product.price >= price.min && product.price <= price.max
        }
      });
    }

    

    if(sort) {
      const { type, order } = sort;

      if(type === 'price') {
        returnedProducts = returnedProducts.sort((a, b) => {

          if(Array.isArray(a)) {
            const mainProductA = a.find((p) => p.mainProduct);

            if(!mainProductA) {
              throw new Error(`Product group "${a[0].name}" does not have a main product`);
            }

            a = mainProductA;
          }

          if(Array.isArray(b)) {
            const mainProductB = b.find((p) => p.mainProduct);

            if(!mainProductB) {
              throw new Error(`Product group "${b[0].name}" does not have a main product`);
            }

            b = mainProductB;
          }



          if(order === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if(type === 'name') {
        returnedProducts = returnedProducts.sort((a, b) => {
          if(Array.isArray(a)) {
            const mainProductA = a.find((p) => p.mainProduct);

            if(!mainProductA) {
              throw new Error(`Product group "${a[0].name}" does not have a main product`);
            }

            a = mainProductA;
          }

          if(Array.isArray(b)) {
            const mainProductB:DBProductType|undefined = b.find((p) => p.mainProduct);

            if(!mainProductB) {
              throw new Error(`Product group "${b[0].name}" does not have a main product`);
            }

            b = mainProductB;
          }

          if(order === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else if(type === 'date') {
        returnedProducts = returnedProducts.sort((a, b) => {

          if(Array.isArray(a)) {
            const mainProductA = a.find((p) => p.mainProduct);

            if(!mainProductA) {
              throw new Error(`Product group "${a[0].name}" does not have a main product`);
            }

            a = mainProductA;
          }

          if(Array.isArray(b)) {
            const mainProductB = b.find((p) => p.mainProduct);

            if(!mainProductB) {
              throw new Error(`Product group "${b[0].name}" does not have a main product`);
            }

            b = mainProductB;
          }


          if(order === 'asc') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          } else {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
        });
      } else if(type === 'sellCount') {
        returnedProducts = returnedProducts.sort((a, b) => {

          if(Array.isArray(a)) {
            const mainProductA = a.find((p) => p.mainProduct);

            if(!mainProductA) {
              throw new Error(`Product group "${a[0].name}" does not have a main product`);
            }

            a = mainProductA;
          }

          if(Array.isArray(b)) {
            const mainProductB = b.find((p) => p.mainProduct);

            if(!mainProductB) {
              throw new Error(`Product group "${b[0].name}" does not have a main product`);
            }

            b = mainProductB;
          }

          if(order === 'asc') {
            return a.sellCount - b.sellCount;
          } else {
            return b.sellCount - a.sellCount;
          }
        });
      }

    
    }

    const total = returnedProducts.length;

    let start = offset ?? 0;
    
    
    if(limit) {
      returnedProducts = returnedProducts.slice(start, start + limit);
    }
    // rejects(new Error("Test Error from getProductsFromDB"));

    resolve({products: returnedProducts, total});
    
    
  });

}

export const getDBProduct:GetDBProductType = async (id) => {
  
  return new Promise((resolve) => {
    
  const product = products.find((product) => {
    if(Array.isArray(product)) {
      
      const mainProduct = product.find((p) => p.mainProduct);

      if(!mainProduct) {
        throw new Error(`Product group "${product[0].name}" does not have a main product`);
      }

      return mainProduct.id === id;
    }

    
    
    return product.id === id;

  });

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

export const getDBAboutHtmlText:GetDBAboutHtmlTextType = async () => {
    
  return new Promise((resolve) => {
    resolve(aboutHtmlText);
  });
}



/************************************
 *  Data
 */

const products:(DBProductType|DBProductGroupType)[] = [
  [
    {
      "id": "1",
      "categoryID": "1",
      "name": "Nail Polish",
      "shortDescription": "Classic red nail polish",
      "fullDescription": "This classic red nail polish is a must-have for any nail collection. The long-lasting, chip-resistant formula will leave your nails looking beautiful and shiny. This shade is perfect for any occasion, from casual to formal.",
      "price": 5.99,
      "date": "2023-02-06",
      "sellCount": 945,
      "images": [
        {
        "url": "/images/003.jpg",
        "alt": "Image 3",
        "default": true
        },
        {
        "url": "/images/001.jpg",
        "alt": "Image 1"
        }
      ],
      "mainProduct": true,
      "variantName": 'Red'
    },
    
    {
      "id": "2",
      "categoryID": "1",
      "name": "Nail Polish",
      "shortDescription": "Glitter nail polish for adding sparkle to your nails",
      "fullDescription": "This glitter nail polish is perfect for adding some sparkle to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The glitter particles are fine and will not fall off easily.",
      "price": 6.99,
      "date": "2023-02-05",
      "sellCount": 657,
      "images": [
        {
        "url": "/images/002.jpg",
        "default": true
        },
      ],
      "variantName": 'Glitter'
    },
    {
      "id": "3",
      "categoryID": "1",
      "name": "Nail Polish",
      "shortDescription": "Bright pink nail polish",
      "fullDescription": "This bright pink nail polish is perfect for adding a pop of color to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The color is vibrant and perfect for spring and summer.",
      "price": 5.99,
      "date": "2023-02-04",
      "sellCount": 812,
      "images": [
        {
        "url": "/images/004.jpg",
        "alt": "Image 4",
        "default": true
        },
        {
        "url": "/images/004.jpg",
        "alt": "Image 5"
        }
      ],
      "variantName": 'Pink'
    },
    {
      "id": "4",
      "categoryID": "1",
      "name": "Nail Polish",
      "shortDescription": "Vibrant orange nail polish",
      "fullDescription": "This vibrant orange nail polish is perfect for adding a pop of color to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The color is perfect for summer and will give your nails a fun, playful look.",
      "price": 5.99,
      "date": "2023-02-03",
      "sellCount": 729,
      "images": [
        {
          "url": "/images/001.jpg",
          "alt": "Image 1",
          "default": true
        },
        {
          "url": "/images/003.jpg",
          "alt": "Image 3"
        }
      ],
      "variantName": 'Orange'
    },
    {
      "id": "5",
      "categoryID": "1",
      "name": "Nail Polish",
      "shortDescription": "Electric blue nail polish",
      "fullDescription": "This electric blue nail polish is perfect for adding a pop of color to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The color is bright and perfect for making a statement.",
      "price": 5.99,
      "date": "2023-02-02",
      "sellCount": 646,
      "images": [
        {
          "url": "/images/002.jpg",
          "alt": "Image 2",
          "default": true
        },
        {
          "url": "/images/004.jpg",
          "alt": "Image 4"
        }
      ],
      "variantName": 'Blue'
    },

  ],  
  {
    "id": "6",
    "categoryID": "5",
    "name": "Cuticle Oil",
    "shortDescription": "Cuticle oil for nourishing and moisturizing cuticles",
    "fullDescription": "This cuticle oil is perfect for nourishing and moisturizing cuticles. It is enriched with natural oils such as jojoba and sweet almond oil, which will keep your cuticles healthy and prevent them from cracking or splitting. It can be used daily for best results.",
    "price": 7.99,
    "date": "2022-02-22",
    "sellCount": 153,
    "images": [
      {
        "url": "/images/004.jpg",
        "default": true
      },
      {
        "url": "/images/004.jpg"
      },
      {
        "url": "/images/001.jpg"
      },
      {
        "url": "/images/003.jpg"
      }
    ]
  },
  {
    "id": "7",
    "categoryID": "5",
    "name": "Nail Strengthener",
    "shortDescription": "Nail strengthener for reinforcing weak nails",
    "fullDescription": "This nail strengthener is perfect for reinforcing weak nails. It is formulated with ingredients such as keratin and biotin, which will strengthen and fortify nails. It can be used as a base coat or as a standalone treatment.",
    "price": 9.99,
    "date": "2022-01-28",
    "sellCount": 535,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      }
    ]
  },
  {
    "id": "8",
    "categoryID": "2",
    "name": "Cuticle Pusher",
    "shortDescription": "Stainless steel cuticle pusher for pushing back cuticles",
    "fullDescription": "This stainless steel cuticle pusher is perfect for pushing back cuticles. It features a pointed tip for precision and a flat end for pushing. It also has a built-in spoon for removing dead skin. It is suitable for use on both natural and artificial nails.",
    "price": 2.99,
    "date": "2021-02-28",
    "sellCount": 446,
    "images": [
      {
        "url": "/images/002.jpg",
        "default": true
      },
      {
        "url": "/images/002.jpg"
      },
      {
        "url": "/images/002.jpg"
      }
    ]
  },
  {
    "id": "9",
    "categoryID": "4",
    "name": "Gel Nail Kit",
    "shortDescription": "Kit for sculpting and extending nails with gel",
    "fullDescription": "This gel nail kit is perfect for sculpting and extending nails. It includes a gel base coat, a gel top coat, and a UV lamp for curing the gel. It also includes a file and buffer for shaping and smoothing nails.",
    "price": 34.99,
    "date": "2022-02-23",
    "sellCount": 631,
    "images": [
      {
        "url": "/images/002.jpg",
        "alt": "Image 2",
        "default": true
      },
      {
        "url": "/images/003.jpg"
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      },
      {
        "url": "/images/001.jpg"
      }
    ]
  },
  {
    "id": "10",
    "categoryID": "3",
    "name": "Nail Art Brush Set",
    "shortDescription": "Brush set for creating intricate nail designs",
    "fullDescription": "This brush set includes a variety of brushes for creating intricate nail designs. The set includes brushes for fine lines, shading, and detailing. The brushes are made of high-quality synthetic fibers and have comfortable wooden handles.",
    "price": 14.99,
    "date": "2022-01-22",
    "sellCount": 873,
    "images": [
      {
        "url": "/images/001.jpg",
        "alt": "Image 1",
        "default": true
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      },
      {
        "url": "/images/003.jpg",
        "alt": "Image 3"
      }
    ]
  },
  {
    "id": "11",
    "categoryID": "1",
    "name": "French Manicure Kit",
    "shortDescription": "Kit for creating a French manicure",
    "fullDescription": "This French manicure kit includes everything you need to create a classic French manicure. It includes a white nail polish for the tips, a pink nail polish for the base, and a top coat for a glossy finish. It also includes a guide for creating the perfect French manicure.",
    "price": 14.99,
    "date": "2020-02-19",
    "sellCount": 782,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/003.jpg",
        "alt": "Image 3"
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      }
    ]
  },
  {
    "id": "12",
    "categoryID": "2",
    "name": "Nail File",
    "shortDescription": "Glass nail file for shaping and smoothing nails",
    "fullDescription": "This glass nail file is perfect for shaping and smoothing nails. It is made of high-quality glass, making it long-lasting and durable. It is also gentle on nails and will not cause any damage. It can be used on both natural and artificial nails.",
    "price": 5.99,
    "date": "2021-02-19",
    "sellCount": 941,
    "images": [
      {
        "url": "/images/004.jpg",
        "alt": "Image 4",
        "default": true
      }
    ]
  },
  {
    "id": "13",
    "categoryID": "3",
    "name": "Nail Art Stamping Kit",
    "shortDescription": "Kit for creating stamped nail designs",
    "fullDescription": "This nail art stamping kit includes everything you need to create stamped nail designs. It includes a stamping plate with a variety of designs, a stamping polish, and a stamper. The kit also includes a guide for creating the perfect stamped design.",
    "price": 19.99,
    "date": "2022-07-11",
    "sellCount": 921,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/002.jpg"
      },
      {
        "url": "/images/002.jpg"
      }
    ]
  },
  {
    "id": "14",
    "categoryID": "4",
    "name": "Nail Forms",
    "shortDescription": "Nail forms for sculpting and extending nails",
    "fullDescription": "These nail forms are perfect for sculpting and extending nails. They are made of a flexible and durable material that can be easily shaped to fit any nail. They can be used with any nail enhancement product and are suitable for both professional and home use.",
    "price": 9.99,
    "date": "2022-03-12",
    "sellCount": 799,
    "images": [
      {
        "url": "/images/004.jpg",
        "alt": "Image 4",
        "default": true
      },
      {
        "url": "/images/002.jpg"
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      }
    ]
  },
  {
    "id": "15",
    "categoryID": "5",
    "name": "Nail Repair Serum",
    "shortDescription": "Serum for repairing damaged nails",
    "fullDescription": "This nail repair serum is perfect for repairing damaged nails. It is formulated with ingredients such as keratin and biotin, which will strengthen and fortify nails. It can be used as a base coat or as a standalone treatment, it will help to prevent nails from cracking or splitting.",
    "price": 12.99,
    "date": "2022-06-12",
    "sellCount": 673,
    "images": [
      {
        "url": "/images/003.jpg",
        "alt": "Image 3",
        "default": true
      },
      {
        "url": "/images/004.jpg",
        "alt": "Image 4"
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      },
      {
        "url": "/images/001.jpg"
      }
    ]
  },
  {
    "id": "16",
    "categoryID": "1",
    "name": "Matte Top Coat",
    "shortDescription": "Matte top coat for creating a matte finish",
    "fullDescription": "This matte top coat is perfect for creating a matte finish on your nails. It can be used over any nail polish to give it a matte finish. The long-lasting formula will keep your nails looking beautiful and matte.",
    "price": 7.99,
    "date": "2022-05-19",
    "sellCount": 712,
    "images": [
      {
        "url": "/images/001.jpg",
        "alt": "Image 1",
        "default": true
      }
    ]
  },
  {
    "id": "17",
    "categoryID": "2",
    "name": "Nail Scissors",
    "shortDescription": "Stainless steel scissors for trimming nails",
    "fullDescription": "These stainless steel scissors are perfect for trimming nails. They feature sharp and precise cutting edges for a clean cut every time. They are also suitable for use on both natural and artificial nails.",
    "price": 4.99,
    "date": "2019-05-11",
    "sellCount": 557,
    "images": [
      {
        "url": "/images/004.jpg",
        "default": true
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      },
      {
        "url": "/images/003.jpg"
      }
    ]
  },
  {
    "id": "18",
    "categoryID": "3",
    "name": "Nail Art Rhinestones",
    "shortDescription": "Rhinestones for adding sparkle to your nails",
    "fullDescription": "These rhinestones are perfect for adding sparkle to your nails. They come in a variety of sizes and colors, making them suitable for any nail design. They are easy to apply and can be used with any nail polish or gel.",
    "price": 6.99,
    "date": "2021-06-11",
    "sellCount": 548,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      },
      {
        "url": "/images/004.jpg"
      },
      {
        "url": "/images/002.jpg"
      }
    ]
  },
  {
    "id": "19",
    "categoryID": "4",
    "name": "Polygel Nail Kit",
    "shortDescription": "Kit for sculpting and extending nails with polygel",
    "fullDescription": "This polygel nail kit is perfect for sculpting and extending nails. It includes a polygel base, a polygel top coat, and a UV lamp for curing the gel. It also includes a file and buffer for shaping and smoothing nails.",
    "price": 24.99,
    "date": "2022-07-12",
    "sellCount": 125,
    "images": [
      {
        "url": "/images/001.jpg",
        "alt": "Image 1",
        "default": true
      },
      {
        "url": "/images/004.jpg",
        "alt": "Image 4"
      }
    ]
  },
  {
    "id": "20",
    "categoryID": "5",
    "name": "Hand Cream",
    "shortDescription": "Hand cream for moisturizing and nourishing hands",
    "fullDescription": "This hand cream is perfect for moisturizing and nourishing hands. It is formulated with natural ingredients such as shea butter and vitamin E, which will leave your hands feeling soft and smooth. It can be used daily for best results.",
    "price": 8.99,
    "date": "2019-08-15",
    "sellCount": 130,
    "images": [
      {
        "url": "/images/002.jpg",
        "default": true
      },
      {
        "url": "/images/003.jpg",
        "alt": "Image 3"
      },
      {
        "url": "/images/003.jpg"
      }
    ]
  },
  {
    "id": "21",
    "categoryID": "1",
    "name": "Holographic Nail Polish",
    "shortDescription": "Nail polish with holographic effect",
    "fullDescription": "This nail polish is perfect for adding a holographic effect to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The holographic particles are fine and will not fall off easily.",
    "price": 8.99,
    "date": "2022-08-19",
    "sellCount": 867,
    "images": [
      {
        "url": "/images/004.jpg",
        "alt": "Image 4",
        "default": true
      },
      {
        "url": "/images/004.jpg"
      },
      {
        "url": "/images/004.jpg",
        "alt": "Image 4"
      }
    ]
  },
  {
    "id": "22",
    "categoryID": "2",
    "name": "Nail Buffer",
    "shortDescription": "Buffer for smoothing and shining nails",
    "fullDescription": "This buffer is perfect for smoothing and shining nails. It has four different surfaces for filing, buffing, shining, and smoothing nails. It can be used on both natural and artificial nails.",
    "price": 3.99,
    "date": "2022-05-12",
    "sellCount": 124,
    "images": [
      {
        "url": "/images/003.jpg",
        "alt": "Image 3",
        "default": true
      },
      {
        "url": "/images/003.jpg"
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      },
      {
        "url": "/images/003.jpg"
      }
    ]
  },
  {
    "id": "24",
    "categoryID": "4",
    "name": "Nail Extension Glue",
    "shortDescription": "Glue for attaching artificial nails",
    "fullDescription": "This nail extension glue is perfect for attaching artificial nails. It is strong and long-lasting, ensuring that your artificial nails stay securely in place. It dries quickly and can be used with any type of artificial nails.",
    "price": 7.99,
    "date": "2022-08-11",
    "sellCount": 691,
    "images": [
      {
        "url": "/images/003.jpg",
        "default": true
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      }
    ]
  },
  {
    "id": "25",
    "categoryID": "5",
    "name": "Nail Growth Serum",
    "shortDescription": "Serum for promoting nail growth",
    "fullDescription": "This nail growth serum is perfect for promoting nail growth. It is formulated with ingredients such as biotin and keratin, which will strengthen and nourish nails. It can be used as a base coat or as a standalone treatment to help nails grow faster.",
    "price": 12.99,
    "date": "2018-08-19",
    "sellCount": 862,
    "images": [
      {
        "url": "/images/003.jpg",
        "default": true
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      }
    ]
  },
  {
    "id": "27",
    "categoryID": "2",
    "name": "Nail Clipper",
    "shortDescription": "Stainless steel clipper for trimming nails",
    "fullDescription": "This stainless steel clipper is perfect for trimming nails. It features sharp cutting edges for a clean cut every time. It also has a built-in file for shaping and smoothing nails. It is suitable for use on both natural and artificial nails.",
    "price": 4.99,
    "date": "2022-04-12",
    "sellCount": 344,
    "images": [
      {
        "url": "/images/003.jpg",
        "alt": "Image 3",
        "default": true
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      }
    ]
  },
  {
    "id": "28",
    "categoryID": "3",
    "name": "Nail Art Stencils",
    "shortDescription": "Stencils for creating intricate nail designs",
    "fullDescription": "These stencils are perfect for creating intricate nail designs. They come in a variety of shapes and patterns, making them suitable for any nail design. They are easy to use and can be used with any nail polish or gel.",
    "price": 7.99,
    "date": "2022-04-12",
    "sellCount": 102,
    "images": [
      {
        "url": "/images/002.jpg",
        "alt": "Image 2",
        "default": true
      },
      {
        "url": "/images/002.jpg"
      },
      {
        "url": "/images/001.jpg"
      }
    ]
  },
  {
    "id": "29",
    "categoryID": "4",
    "name": "Nail Tips",
    "shortDescription": "Nail tips for sculpting and extending nails",
    "fullDescription": "These nail tips are perfect for sculpting and extending nails. They are made of a durable and flexible material that can be easily shaped to fit any nail. They can be used with any nail enhancement product and are suitable for both professional and home use.",
    "price": 14.99,
    "date": "2022-04-12",
    "sellCount": 345,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/002.jpg"
      }
    ]
  },
  {
    "id": "30",
    "categoryID": "5",
    "name": "Hand Scrub",
    "shortDescription": "Hand scrub for exfoliating and moisturizing hands",
    "fullDescription": "This hand scrub is perfect for exfoliating and moisturizing hands. It is formulated with natural ingredients such as sugar and coconut oil, which will leave your hands feeling soft and smooth. It can be used weekly for best results.",
    "price": 9.99,
    "date": "2022-04-13",
    "sellCount": 694,
    "images": [
      {
        "url": "/images/003.jpg",
        "default": true
      },
      {
        "url": "/images/002.jpg",
        "alt": "Image 2"
      }
    ]
  },
  {
    "id": "31",
    "categoryID": "1",
    "name": "Nail Art Brush Set",
    "shortDescription": "Set of brushes for creating intricate nail designs",
    "fullDescription": "This set of brushes is perfect for creating intricate nail designs. It includes brushes of different sizes and shapes for fine detailing and overall coverage. They are easy to use and can be used with any nail polish or gel.",
    "price": 14.99,
    "date": "2022-04-14",
    "sellCount": 382,
    "images": [
      {
        "url": "/images/004.jpg",
        "alt": "Image 4",
        "default": true
      },
      {
        "url": "/images/001.jpg"
      },
      {
        "url": "/images/004.jpg",
        "alt": "Image 4"
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      }
    ]
  },
  {
    "id": "32",
    "categoryID": "2",
    "name": "Nail Drill",
    "shortDescription": "Electric nail drill for shaping and smoothing nails",
    "fullDescription": "This electric nail drill is perfect for shaping and smoothing nails. It has a variety of attachments for different nail shaping and smoothing tasks. It is suitable for use on both natural and artificial nails and is suitable for both professional and home use.",
    "price": 34.99,
    "date": "2022-05-12",
    "sellCount": 203,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/003.jpg",
        "alt": "Image 3"
      }
    ]
  },
  {
    "id": "33",
    "categoryID": "3",
    "name": "Nail Art Foil",
    "shortDescription": "Foil for creating metallic nail designs",
    "fullDescription": "This nail art foil is perfect for creating metallic nail designs. It comes in a variety of colors and can be used with any nail polish or gel. It is easy to apply and will give a metallic finish to any nail design.",
    "price": 8.99,
    "date": "2022-06-12",
    "sellCount": 949,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/003.jpg"
      },
      {
        "url": "/images/004.jpg"
      },
      {
        "url": "/images/004.jpg",
        "alt": "Image 4"
      }
    ]
  },
  {
    "id": "34",
    "categoryID": "4",
    "name": "Acrylic Nail Powder",
    "shortDescription": "Acrylic powder for sculpting and extending nails",
    "fullDescription": "This acrylic powder is perfect for sculpting and extending nails. It can be mixed with liquid to create a paste for sculpting and extending nails. It is suitable for use on both natural and artificial nails and is suitable for both professional and home use.",
    "price": 19.99,
    "date": "2022-06-13",
    "sellCount": 169,
    "images": [
      {
        "url": "/images/004.jpg",
        "default": true
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      }
    ]
  },
  {
    "id": "35",
    "categoryID": "5",
    "name": "Nail Cuticle Oil",
    "shortDescription": "Oil for moisturizing and nourishing cuticles",
    "fullDescription": "This cuticle oil is perfect for moisturizing and nourishing cuticles. It is formulated with natural ingredients such as jojoba oil and vitamin E, which will leave your cuticles looking healthy and hydrated. It can be used daily for best results.",
    "price": 9.99,
    "date": "2022-06-14",
    "sellCount": 79,
    "images": [
      {
        "url": "/images/002.jpg",
        "default": true
      },
      {
        "url": "/images/001.jpg"
      },
      {
        "url": "/images/003.jpg",
        "alt": "Image 3"
      }
    ]
  },
  {
    "id": "36",
    "categoryID": "1",
    "name": "Nail Art Stickers",
    "shortDescription": "Stickers for decorating nails",
    "fullDescription": "These stickers are perfect for decorating nails. They come in a variety of designs and patterns, making them suitable for any nail design. They are easy to apply and can be used with any nail polish or gel.",
    "price": 5.99,
    "date": "2022-06-15",
    "sellCount": 675,
    "images": [
      {
        "url": "/images/002.jpg",
        "default": true
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      },
      {
        "url": "/images/001.jpg",
        "alt": "Image 1"
      }
    ]
  },
  {
    "id": "37",
    "categoryID": "2",
    "name": "Nail File",
    "shortDescription": "File for shaping and smoothing nails",
    "fullDescription": "This file is perfect for shaping and smoothing nails. It has different surfaces for filing, buffing, shining, and smoothing nails. It can be used on both natural and artificial nails and is suitable for both professional and home use.",
    "price": 2.99,
    "date": "2022-06-16",
    "sellCount": 752,
    "images": [
      {
        "url": "/images/003.jpg",
        "default": true
      },
      {
        "url": "/images/004.jpg"
      },
      {
        "url": "/images/003.jpg"
      },
      {
        "url": "/images/004.jpg"
      }
    ]
  },
  {
    "id": "38",
    "categoryID": "3",
    "name": "Nail Art Glitter",
    "shortDescription": "Glitter for adding sparkle to your nails",
    "fullDescription": "This glitter is perfect for adding sparkle to your nails. It comes in a variety of colors and can be used with any nail polish or gel. It is easy to apply and will give a sparkle finish to any nail design.",
    "price": 4.99,
    "date": "2022-06-17",
    "sellCount": 463,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/004.jpg"
      },
      {
        "url": "/images/004.jpg",
        "alt": "Image 4"
      },
      {
        "url": "/images/001.jpg"
      }
    ]
  },
  {
    "id": "39",
    "categoryID": "4",
    "name": "Gel Nail Kit",
    "shortDescription": "Kit for sculpting and extending nails with gel",
    "fullDescription": "This gel nail kit is perfect for sculpting and extending nails. It includes a gel base, a gel top coat, and a UV lamp for curing the gel. It also includes a file and buffer for shaping and smoothing nails. It is suitable for both professional and home use.",
    "price": 29.99,
    "date": "2022-06-18",
    "sellCount": 506,
    "images": [
      {
        "url": "/images/001.jpg",
        "default": true
      },
      {
        "url": "/images/003.jpg",
        "alt": "Image 3"
      },
      {
        "url": "/images/001.jpg"
      },
      {
        "url": "/images/004.jpg"
      }
    ]
  },
  {
    "id": "40",
    "categoryID": "5",
    "name": "Hand Lotion",
    "shortDescription": "Lotion for moisturizing and nourishing hands",
    "fullDescription": "This hand lotion is perfect for moisturizing and nourishing hands. It is formulated with natural ingredients such as cocoa butter and vitamin E, which will leave your hands feeling soft and smooth. It can be used daily for best results.",
    "price": 7.99,
    "date": "2022-06-19",
    "sellCount": 611,
    "images": [
      {
        "url": "/images/004.jpg",
        "alt": "Image 4",
        "default": true
      },
      {
        "url": "/images/001.jpg"
      }
    ]
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

const aboutHtmlText = `
    <p>At our Nail Supply Shop, we&apos;ve been providing top-quality nail products and services for over 20 years. We take pride in offering a wide range of products to meet the needs of both professional nail technicians and at-home enthusiasts.</p>

    <p>Our staff is highly trained and knowledgeable about all of the products we carry, and we&apos;re always happy to help you find exactly what you need. We strive to provide excellent customer service, and work hard to ensure that our prices are competitive and fair.</p>

    <p>We offer a wide range of products including:</p>

    <ul>
      <li>Nail polish</li>
      <li>Nail art supplies</li>
      <li>Acrylics, gels, and other sculpting products</li>
      <li>Tools and equipment</li>
    </ul>
    `