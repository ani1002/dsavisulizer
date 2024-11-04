let bars = [];
const def = "#fd0081", chng = "#431f91", finished = "#557A46", selected = "yellow";

// Metrics Variables
let comparisons = 0;
let swaps = 0;
let iterations = 0;

// let ms = 500;
 
window.onload = setup;

function setup() {
    let ars = document.getElementById("bars");
    let speed = document.getElementById('delay');
 
    document.getElementById('ars').innerText = ars.value;
    document.getElementById('speed').innerText = speed.value + "ms";
   // generateBars(parseInt(ars.value)); // Generate bars when the page loads
    generatearray(parseInt(ars.value));
}

var  newbars = [];

function generatearray(n=-1){
    newbars = [];
     for(let i=0;i<n;i++){
        newbars.push(Math.floor(Math.random() * 99));
     }
   //  console.log(newbars);
     generateBars();
}
function reset() {
    location.reload();
}

// Generate bars as div elements in the DOM
function generateBars() {
   bars = [];
    let container = document.getElementById("container");
    container.innerHTML = ''; // Clear the previous bars

    for (let i = 0; i < newbars.length; i++) {
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = (newbars[i]) + '%'; // Set random height
        container.appendChild(bar); // Append each bar to the container
       bars.push(bar); // Store DOM element in the bars array
    }
}

// Update the performance metrics display
function updateMetrics() {
    document.getElementById('comparisons').innerText = comparisons;
    document.getElementById('swaps').innerText = swaps;
    document.getElementById('iterations').innerText = iterations;
}

// Disable input elements during sorting
function Disable_The_Input() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].disabled = true;
    return parseInt(document.getElementById("delay").value);
}

// Sleep for the specified time in ms (used to control the speed of the visualization)
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Mark the bars as finished after sorting
function finished_input() {
    for (let bar of bars) {
        bar.style.backgroundColor = finished;
    }
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].disabled = false;
}

// Bubble Sort algorithm
async function BubbleSort() {
    let delay = Disable_The_Input(); // Disable input during sorting
    comparisons = swaps = iterations = 0; // Reset metrics
    await bubbleSort(delay);
    finished_input(); // Re-enable input after sorting
    updateMetrics(); // Update the metrics display
    createPopup(0);
    
}

async function bubbleSort(delay) {
    let n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            bars[j].style.backgroundColor = chng; // Highlight bar being compared
            bars[j + 1].style.backgroundColor = chng; // Highlight next bar
            await Sleep(delay);
            
            let height1 = parseInt(bars[j].style.height);
            let height2 = parseInt(bars[j + 1].style.height);
            
            if (height1 > height2) {
                swaps++;
                swapBars(j, j + 1); // Swap bars
            }

            bars[j].style.backgroundColor = def; // Revert color
            bars[j + 1].style.backgroundColor = def; // Revert color
        }
        iterations++;
    }
}

// Selection Sort algorithm
async function SelectionSort() {
    let delay = Disable_The_Input(); // Disable input during sorting
    comparisons = swaps = iterations = 0; // Reset metrics
    await selectionSort(delay); // Wait for the sorting to finish
    finished_input(); // Re-enable input after sorting
    updateMetrics(); // Update the metrics display
    createPopup(1); // Create popup with sort type 1 (Selection Sort)
}

async function selectionSort(delay) {
    let n = bars.length;

    // Outer loop for selection sort
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = chng; // Highlight current minimum

        // Inner loop to find the minimum element
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            bars[j].style.backgroundColor = chng; // Highlight bar being compared
            await Sleep(delay);

            // Compare heights of bars
            if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
                if (minIdx !== i) {
                    bars[minIdx].style.backgroundColor = def; // Revert previous minimum bar color
                }
                minIdx = j; // Update new minimum index
                bars[minIdx].style.backgroundColor = chng; // Highlight new minimum
            } else {
                bars[j].style.backgroundColor = def; // Revert compared bar color
            }
        }

        // Swap if the current minimum is different from the starting element
        if (minIdx !== i) {
            swaps++;
            await swapBars(i, minIdx); // Await the bar swap to ensure proper UI update
        }

        bars[i].style.backgroundColor = def; // Mark the sorted element
        iterations++; // Increase the number of iterations
    }

    // After all iterations, mark the last bar as sorted
    bars[n - 1].style.backgroundColor = def;
}



// Insertion Sort algorithm
async function InsertionSort(n) {
    let delay = Disable_The_Input(); // Disable input during sorting
    comparisons = swaps = iterations = 0; // Reset metrics
    await insertionSort(delay);
    finished_input(); // Re-enable input after sorting
    console.log("hello ");
    updateMetrics(); // Update the metrics display
    console.log("hiii goo");
    createPopup(2);
    
}

async function insertionSort(delay) {
    let n = bars.length;
    for (let i = 1; i < n; i++) {
        let keyHeight = parseInt(bars[i].style.height);
        let j = i - 1;

        bars[i].style.backgroundColor = selected; // Highlight the key bar
        await Sleep(delay);

        while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
            comparisons++;
            bars[j].style.backgroundColor = chng; // Highlight bar being compared
            bars[j + 1].style.height = bars[j].style.height;
            bars[j].style.backgroundColor = def; // Revert color
            j--;
            swaps++;
            await Sleep(delay);
        }
        bars[j + 1].style.height = keyHeight + '%';
        bars[i].style.backgroundColor = def; // Revert color

        iterations++;
    }
}




// Merge Sort algorithm with iteration tracking
async function MergeSort() {
    let delay = Disable_The_Input(); // Disable input during sorting
    comparisons = swaps = iterations = 0; // Reset metrics
    await mergeSort(0, bars.length - 1, delay);
    finished_input(); // Re-enable input after sorting
    updateMetrics(); // Update the metrics display
    createPopup(3);
}

async function mergeSort(l, r, delay) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSort(l, m, delay);
    await mergeSort(m + 1, r, delay);
    await merge(l, m, r, delay);
    iterations++; // Increment iteration count after each merge
    updateMetrics(); // Update metrics display
}

async function merge(l, m, r, delay) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let left = [];
    let right = [];

    // Copy data to temporary arrays left[] and right[]
    for (let i = 0; i < n1; i++) {
        left[i] = bars[l + i].style.height;
        bars[l + i].style.backgroundColor = selected; // Highlight left side
    }
    for (let i = 0; i < n2; i++) {
        right[i] = bars[m + 1 + i].style.height;
        bars[m + 1 + i].style.backgroundColor = chng; // Highlight right side
    }

    await Sleep(delay);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        comparisons++; // Increment comparisons count
        let leftHeight = parseInt(left[i]);
        let rightHeight = parseInt(right[j]);

        if (leftHeight <= rightHeight) {
            bars[k].style.height = left[i];
            bars[k].style.backgroundColor = def;
            i++;
        } else {
            bars[k].style.height = right[j];
            bars[k].style.backgroundColor = def;
            j++;
        }
        k++;
    }

    while (i < n1) {
        bars[k].style.height = left[i];
        bars[k].style.backgroundColor = def;
        i++;
        k++;
    }

    while (j < n2) {
        bars[k].style.height = right[j];
        bars[k].style.backgroundColor = def;
        j++;
        k++;
    }

    await Sleep(delay);
}

// Quick Sort algorithm with iteration tracking
async function QuickSort() {
    let delay = Disable_The_Input(); // Disable input during sorting
    comparisons = swaps = iterations = 0; // Reset metrics
    await quickSort(0, bars.length - 1, delay);
    finished_input(); // Re-enable input after sorting
    updateMetrics(); // Update the metrics display
    createPopup(4);
}

async function quickSort(low, high, delay) {
    if (low < high) {
        iterations++; // Increment iteration count after partitioning
        updateMetrics(); // Update metrics display
        let pi = await partition(low, high, delay);
        await quickSort(low, pi - 1, delay);
        await quickSort(pi + 1, high, delay);
    }
}

async function partition(low, high, delay) {
    let pivot = bars[high].style.height;
    bars[high].style.backgroundColor = selected; // Highlight pivot

    let i = (low - 1);

    for (let j = low; j < high; j++) {
        comparisons++; // Increment comparisons count
        let barHeight = parseInt(bars[j].style.height);
        let pivotHeight = parseInt(pivot);

        bars[j].style.backgroundColor = chng; // Highlight bars being compared

        await Sleep(delay);

        if (barHeight < pivotHeight) {
            i++;
            swaps++; // Increment swaps count
            swapBars(i, j); // Swap if bar height is less than pivot
            bars[i].style.backgroundColor = def;
        }

        bars[j].style.backgroundColor = def; // Revert color after comparison
    }

    swaps++; // Increment swaps count for pivot
    swapBars(i + 1, high); // Swap pivot to correct position
    bars[high].style.backgroundColor = def;

    await Sleep(delay);

    return i + 1;
}


// Utility function to swap bars
function swapBars(i, j) {
    let tempHeight = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = tempHeight;
}



// Open the Popup
function openPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
  }
  
  function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
  }
  
  function submitArrayInput() {
    const arrayInput = document.getElementById("arrayInput").value;
    if (arrayInput.trim() === "") {
      alert("Please enter an array!");
      return;
    }
    if (/[^0-9, ]/.test(arrayInput)) {
        alert("Invalid input. Please enter a Number  list of numbers.");
        return;
      }
     
    const array = arrayInput.split(",").map(num => parseInt(num.trim()));
  
    for(let i=0;i<array.length;i++){
      if(array[i]<0 || array[i]>115) return  alert("Please enter a valid array! or you want to remove negetive val press ok");
  }
  
  
   
    console.log("Custom Array:", array);
  
    // Perform further actions with the custom array (e.g., pass it to the sorting algorithm)
  newbars = [...array];
  inputarrayclosePopup(); // Close the popup after submission
    generateBars();
  }
  



