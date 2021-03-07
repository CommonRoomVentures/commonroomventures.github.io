// button element
const button = [...document.querySelectorAll(".submit-button")];

// button event listener
button.forEach((searchBtn) => {
  searchBtn.addEventListener("click", function () {
    const tickerField = document.getElementById("ticker-search");
    const tickerValue = document.getElementById("ticker-search").value;
    const checked = getChecked();
    if (tickerValue === "") {
      tickerField.focus();
      return alert("Enter a ticker");
    } else if (checked.length === 0) {
      return alert("Select sites");
    }
    compose(tickerValue, checked);
  });
});

const compose = async (ticker, checked) => {
  const links = await makeLinks(checked, ticker);
  openSites(links);
};

// get URL value from checked checkboxes
const getChecked = () => {
  const checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((e) => e.value);
  return checked;
};

const makeLinks = async (checked, ticker) => {
  const jsonObj = await getJSON();
  const cik = await filter(jsonObj, ticker);
  const linksArr = checked.map((site) => {
    if (
      site === "https://docoh.com/company/" ||
      site === "https://www.sec.gov/cgi-bin/browse-edgar?CIK="
    ) {
      return `${site}${cik}`;
    } else {
      return `${site}${ticker}`;
    }
  });
  return linksArr;
};

const getJSON = async (tickerInput) => {
  const res = await fetch("./CIK/cik-json.json");
  const json = await res.json();
  return json;
};

const filter = async (json, tickerInput) => {
  try {
    const filtered = await json.filter((obj) => obj.ticker === tickerInput);
    return await filtered[0].cik;
  } catch (e) {
    alert("Ticker not found");
    throw new Error("Ticker not found");
  }
};

const openSites = (linksArr) => {
  linksArr.forEach((link) => {
    window.open(link);
  });
};
