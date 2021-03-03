// node

// const fs = require("fs");

// const rawNums = fs.readFileSync("./number_CIK.txt", "utf-8");
// const rawTickers = fs.readFileSync("./ticker_CIK.txt", "utf-8");

// const nums = rawNums.split('\n'); 
// const tickers = rawTickers.split('\n'); 


// const getCik = (tickers, searchTerm) => { 

//   const getIndex = tickers.indexOf(searchTerm); 
//   const getValue = nums[getIndex]; 
//   return getValue; 

//  }


//  --------
// basic JavaScript 

  const getCIK = () => { 
    return fetch('./CIK/ticker_CIK.txt')
    .then(response => response.text())
    .then(data => {
      const it = data.split('\n');
      console.log(it);
    });
   }