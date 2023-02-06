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
    }));            
    
    
    return result;
}