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

const makeLinks = async (checkedVal, tickerInput) => {
  const json = await getJSON();
  const linksArr = checkedVal.map((site) => {
    if (
      site === "https://docoh.com/company/" ||
      site === "https://www.sec.gov/cgi-bin/browse-edgar?CIK="
    ) {
      const cik = filter(json, tickerInput);
      return `${site}${cik}`;
    } else {
      return `${site}${tickerInput}`;
    }
  });
  openSites(linksArr);
};

// open URLs in new tabs in one new window
const openSites = (linksArr) => {
  linksArr.forEach((link) => {
    window.open(link);
  });
};

// ---------
// TODO use indexOf to get cik
const getJSON = async () => {
  const res = await fetch("./CIK/cik-json.json");
  const data = await res.json();
  return data;
};

const filter = (json, tickerInput) => { 
  const filtered = json.filter((obj) => obj.ticker === tickerInput);
  return filtered[0].cik; 
 }


