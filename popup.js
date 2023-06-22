let arr = localStorage.getItem("color")
  ? JSON.parse(localStorage.getItem("color"))
  : [];
console.log(arr, "for");
let str = arr
  .map((item) => {
    console.log(item.color_value);
    return `<li class = "li_color" style="background-color: ${item.color_value}"></li>`;
  })
  .join(" ");
document.getElementById("my_div").innerHTML = str;
const pickbtn = document.querySelector(".pickcolour");
const colorGrid = document.querySelector(".colourGrid");
const colorValue = document.querySelector(".colourValue");
let pickedcolor = localStorage.getItem("color");
console.log(pickedcolor);

pickbtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: colourPick,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        arr.push({
          color_value: color,
        });
        localStorage.setItem("color", JSON.stringify(arr));
        colorGrid.style.backgroundColor = color;

        colorValue.innerText = color;

        console.log(injectionResults);
        try {
          await navigator.clipboard.writeText(color);
          console.log("colour copied successfully!");
        } catch (err) {
          console.error(err);
        }
      }
    }
  );
});

async function colourPick() {
  console.log("script Working");

  try {
    // active picker
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    console.log(selectedcolour);
  } catch (err) {
    console.error(err);
  }
}
