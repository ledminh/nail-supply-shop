const { writeFile, readFile } = require('fs');
const path = process.argv[2] ;

readFile(path, (error, dataString) => {
  if (error) {
    console.log(error);
    return;
  }
  let data = JSON.parse(dataString);
  
    // Do something with the data
    data = doSomething(data);
  
  writeFile(path, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log('Failed to write updated data to file');
      return;
    }
    console.log('Updated file successfully');
  });
});


const doSomething = (data) => {

    let result = data.map((item) => ({
        ...item,
        sellCount: Math.floor(Math.random() * 1000),
        imageUrl: undefined,
        images: ((numImgs) => (
          Array(numImgs).fill(0).map((_, i) => {
            const imageNum = Math.floor(Math.random() * 4) + 1;
            
            if(Math.random() > 0.5) {
              return {
                url: `/images/00${imageNum}.jpg`,
                alt: `Image ${imageNum}`,
                default: (i === 0)? true : undefined
              }
            }
            
            return {
              url: `/images/00${imageNum}.jpg`,
              default: (i === 0)? true : undefined
            }  
          
          })
        ))(Math.floor(Math.random() * 4) + 1)        
        
    }));            
    
    
    return result;
}