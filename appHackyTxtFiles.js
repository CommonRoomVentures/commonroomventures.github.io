const button = document.querySelector(".submit-button");

button.addEventListener("click", function () {
  const tickerEl = document.getElementById("ticker-search");
  const tickerInput = document.getElementById("ticker-search").value;
  const checked = getChecked();
  if (tickerInput === "") {
    tickerEl.focus();
    return alert("Enter a ticker");
  } else if (checked.length === 0) {
    return alert("Select sites");
  }
  makeLinks(checked, tickerInput);
});

// get URL value from checked checkboxes
const getChecked = () => {
  const checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((e) => e.value);
  return checked;
};

// apply ticker symbol to URL
// TODO get cik as ticker input using getCIK() 
// const makeLinks = (checkedVal, tickerInput) => {
//   const linksArr = checkedVal.map((site) => `${site}${tickerInput}`);
//   openSites(linksArr);
// };
const makeLinks = (checkedVal, tickerInput) => {
  const linksArr = checkedVal.map((site) => {
    if(site === 'https://docoh.com/company/' || site === 'https://www.sec.gov/cgi-bin/browse-edgar?CIK=') { 
      const cik = getCIK(tickerInput); 
      return `${site}${cik}`
    } else { 
    return `${site}${tickerInput}`
  }
  });
  openSites(linksArr);
};

// open URLs in new tabs in one new window
const openSites = (linksArr) => {
  linksArr.forEach(link => {
    window.open(link);
  });
};

// ---------
// TODO use indexOf to get cik 
const getCIK = async (tickerInput) => {
  const rawNums = './CIK/number_CIK.txt';
  const rawTickers = './CIK/ticker_CIK.txt';
  const cikArr = [rawNums, rawTickers];

  const nums = await fetch(cikArr[0])
    .then(response => response.text())
    .then(data => data.split('\n'))

  const tickers = await fetch(cikArr[1])
    .then(response => response.text())
    .then(data => data.split('\n'))


  const getIndex = tickers.indexOf(tickerInput); 
  const getValue = nums[getIndex]; 
  return getValue; 
}
