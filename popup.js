

//popup2-body

let curr=
  [
    {
      "name": "Bubbolsort",
      "popup1": "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order, until the list is sorted.",
      "popup2": "image/bubbolsort.webp",
      "popup3": "image/bubbolsort.png",
      "popup4": [
        "Compare each pair of adjacent elements and swap them if they are in the wrong order.",
        "In the first pass, the largest element 'bubbles' to the end of the list.",
        "In the second pass, the second-largest element 'bubbles' to the second-to-last position.",
        "Repeat this process until no more swaps are needed, indicating that the list is sorted."
      ],
      "popup5": [
        
        "bestCase :O(n).",
        "averageCase: O(n^2).",
        "worstCase: O(n^2)."
    
      ]
    },
    {
        "name": "Selectionsort",
        "popup1": "Repeatedly selects the smallest (or largest) element from the unsorted part of the array and moves it to the beginning (or end) of the sorted part.",
        "popup2": "image/selectionsort.webp",
        "popup3": "image/selectionsortpsudiocode.png",
        "popup4":  [
            "Select the smallest element from the unsorted list and move it to the beginning of the sorted list.",
            "Repeat the process, selecting the smallest element from the remaining unsorted list and moving it to the end of the sorted list.",
            "Repeat the process until the entire list is sorted."
          ],
          "popup5": [
        
        "bestCase :O(n).",
        "averageCase: O(n^2).",
        "worstCase: O(n^2)."
    
      ]
      },
      {
        "name": "Insertionsort",
        "popup1": "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time, by inserting each item into its proper position in the previously sorted part of the array.",
        "popup2": "image/insertionsort.png",
        "popup3": "image/insertionsortpsudocode.png",
        "popup4": [
            "Take first element as sorted list.",
            "Iterate through remaining elements, inserting into correct position.",
            "Compare and insert: smaller than first, insert at start; larger than last, insert at end; otherwise, find correct position.",
            
          ],
          "popup5": [
        
        "bestCase :O(n)",
        "averageCase: O(n^2)",
        "worstCase: O(n^2)"
    
      ]
      },
      {
        "name": "Mergesort",
        "popup1": "Merge Sort is a divide-and-conquer algorithm that recursively splits the array, sorts each half, and merges them back together.",
        "popup2": "image/mergesort.png",
        "popup3": "image/mergesortpsudocode.png",
        "popup4": [
            "Divide the list into two halves until each sublist contains only one element (base case).",
            "Merge the sublists in a way that the resulting list is sorted.",
            "Repeat the process until the entire list is sorted."
          ],
          "popup5": [
        
        "bestCase :O(nlogn)",
        "averageCase: O(nlogn)",
        "worstCase: O(nlogn)"
    
      ]
      },
      {
        "name": "Quicksort",
        "popup1": " Divides array into two parts, pivoting around a chosen element, and recursively sorts the subarrays.",
        "popup2": "image/quicksort.png",
        "popup3": "image/Quicksortpsudocode.png",
        "popup4": [
            "Select a pivot element from the list.",
            "Partition the list into two sublists: elements less than the pivot and elements greater than the pivot",
            "Recursively apply the quicksort algorithm to the sublists",
            "Combine the results to produce the sorted list"
          ],
          "popup5": [
        
        "bestCase :O(nlogn)",
        "averageCase: O(nlogn)",
        "worstCase: O(nlogn)"
    
      ]
      }
]
  

function createPopup(n){
    let val = curr[n];
    let popuphead1 = document.getElementById("popup1head");
    let popuphead2 = document.getElementById("popup2head");
    let popuphead3 = document.getElementById("popup3head");
    let popuphead4 = document.getElementById("popup4head");
    let popuphead5 = document.getElementById("popup5head");

    popuphead1.innerText = `${val.name}`;
    popuphead2.innerText = `${val.name} procedure`;
    popuphead3.innerText = `${val.name} psedocode`;
    popuphead4.innerText = `${val.name} algorithm`;
    popuphead5.innerText = `${val.name} Time Complexcity`;
    let popupBody1 = document.getElementById('popup1-body');

let popupBody2 = document.getElementById('popup2-body');
popupBody2.src= val.popup2 ;
let popupBody3 = document.getElementById('popup3-body');
popupBody3.src= val.popup3;
popupBody1.innerText= val.popup1;
let popupbody4 = document.getElementById('popup4-body');
popupbody4.innerHTML = '';


for(let i=0;i<val.popup4.length;i++){
    let listItem = document.createElement('li');
  listItem.textContent = val.popup4[i];
  popupbody4.appendChild(listItem);

  
 }

//popup5
 let popupbody5 = document.getElementById('popup5-body');

 popupbody5.innerHTML = '';
  for(let i=0;i<val.popup5.length;i++){
  let listItem = document.createElement('li');
  listItem.textContent = val.popup5[i];
  popupbody5.appendChild(listItem);

  
 }
 openpopup(1);
 //console.log(curr[n]);
}



function openpopup(popupNumber) {
    document.getElementById(`popup${popupNumber}`).classList.add('show');
 
}

// Function to close the specified popup
function closePopup(popupNumber) {
    document.getElementById(`popup${popupNumber}`).classList.remove('show');
}

// Function to navigate to the next popup
function nextPopup(currentPopup) {
    closePopup(currentPopup);
    openpopup(currentPopup + 1);
}

// Function to navigate to the previous popup
function previousPopup(currentPopup) {
    closePopup(currentPopup + 1);
    openpopup(currentPopup);
}