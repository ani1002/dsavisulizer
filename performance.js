
let arr = [];

function generateBars(n = -1) {
   
    //arr= [];
    for (let i = 0; i < 10; i++) {
        let val = Math.floor(Math.random() * 99);
        arr.push(val);
     }
    console.log(arr);
}

let iterations = 0;
let comparisons = 0;
let swaps = 0;

function bblSort(arr) {
    let n = arr.length;
    let startTime = performance.now();

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++; 
            if (arr[j] > arr[j + 1]) {
                swaps++; 
                // If the condition is true, then swap them
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        iterations++; 
        }

    // End measuring time
    let endTime = performance.now();
    let timeTaken = endTime - startTime; 
    

    return {
        comparisons: comparisons,
        swaps: swaps,
        iterations: iterations,
        time: timeTaken.toFixed(2) 
        };
}

function swap(array, xp, yp) {
    let temp = array[xp];
    array[xp] = array[yp];
    array[yp] = temp;
    swaps++; // Count swap
}

function selectionSort(arr) {
    let comparisons = 0;
    let swaps = 0;
    let iterations = 0;
    let n = arr.length;

    // Start measuring time
    let startTime = performance.now();

    // One by one move boundary of unsorted subarray
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;

        
        for (let j = i + 1; j < n; j++) {
            comparisons++; 
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }

        // Swap the found minimum element with the first element if needed
        if (min_idx !== i) {
            [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
            swaps++; // Count the swap
        }

        iterations++; // Count each iteration of the outer loop
    }

    // End measuring time
    let endTime = performance.now();
    let timeTaken = (endTime - startTime).toFixed(2); // Time in ms

    // Print or return performance metrics
    console.log("Sorted Array:", arr);
    console.log("Comparisons:", comparisons);
    console.log("Swaps:", swaps);
    console.log("Iterations:", iterations);
    console.log("Time Taken:", timeTaken + " ms");

    // Return the performance data
    return {
        comparisons: comparisons,
        swaps: swaps,
        iterations: iterations,
        time: timeTaken
    };
}



function insertionSort(arr) {
    let n = arr.length;

    // Start measuring time
    let startTime = performance.now();

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0) {
            comparisons++; 
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                swaps++; // Count swap
            } else {
                break; 
            }
        }
        arr[j + 1] = key;

        iterations++; // Count iteration
    }

    // End measuring time
    let endTime = performance.now();
    let timeTaken = endTime - startTime; 
    console.log("Iterations:", iterations);
    console.log("Comparisons:", comparisons);
    console.log("Swaps:", swaps);
    console.log("Time Taken:", timeTaken.toFixed(2) + " ms");
    return {
        comparisons: comparisons,
        swaps: swaps,
        iterations: iterations,
        time:  timeTaken.toFixed(2)
    };
}

let mergeComparisons = 0;
let mergeSwaps = 0;
let mergeIterations = 0;




function merge(arr, left, middle, right) {
    let l1 = middle - left + 1;
    let l2 = right - middle;
    let arr1 = new Array(l1);
    let arr2 = new Array(l2);

    // Assign values in subarrays
    for (let i = 0; i < l1; ++i) {
        arr1[i] = arr[left + i];
    }
    for (let i = 0; i < l2; ++i) {
        arr2[i] = arr[middle + 1 + i];
    }

    // Traverse and merge back to the main array
    let i = 0, j = 0, k = left;
    while (i < l1 && j < l2) {
        mergeComparisons++;
        if (arr1[i] <= arr2[j]) {
            arr[k] = arr1[i];
            i++;
        } else {
            arr[k] = arr2[j];
            j++;
        }
        k++;
        mergeIterations++;
        mergeCopies++; // Count the number of elements copied back to the main array
    }

    // Copy remaining elements from arr1 (if any)
    while (i < l1) {
        arr[k] = arr1[i];
        i++;
        k++;
        mergeIterations++;
        mergeCopies++; // Each element copied is counted as a "copy"
    }

    // Copy remaining elements from arr2 (if any)
    while (j < l2) {
        arr[k] = arr2[j];
        j++;
        k++;
        mergeIterations++;
        mergeCopies++; // Each element copied is counted as a "copy"
    }
}

function mergeSort(arr, left, right) {
    if (left >= right) {
        return;
    }

    let middle = left + Math.floor((right - left) / 2);

    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    merge(arr, left, middle, right);
}

// Function to run and measure performance of merge sort
function runMergeSort(arr) {
    // Reset performance metrics
    mergeComparisons = 0;
    mergeCopies = 0;
    mergeIterations = 0;

    // Display input array
    console.log("Original array: " + arr);

    // Apply merge sort function
    let startTime = performance.now();
    mergeSort(arr, 0, arr.length - 1);
    let endTime = performance.now();
    let timeTaken = endTime - startTime;

    // Display output
    console.log("After sorting: " + arr);
    console.log("Comparisons: " + mergeComparisons);
    console.log("Copies: " + mergeCopies); // Now counting element movements
    console.log("Iterations: " + mergeIterations);
    console.log("Time Taken:", timeTaken.toFixed(2) + " ms");

    return {
        comparisons: mergeComparisons,
        copies: mergeCopies,  // Changed 'swaps' to 'copies'
        iterations: mergeIterations,
        time: timeTaken.toFixed(2)
    };
}


// Driver code


function resetMetrics() {
    iterations = 0;
    comparisons = 0;
    swaps = 0;
}





// Example usage:
let array = [341, 819, 275, 467, 138, 654, 821, 357, 492, 619, 843, 271, 956, 118, 745, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852, 391, 726, 149, 985, 623, 478, 819, 357, 692, 275, 946, 118, 753, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852, 391, 726, 149, 985, 623, 478, 819, 357, 692, 275, 946, 118, 753, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852, 391, 726, 149, 985, 623, 478, 819, 357, 692, 275, 946, 118, 753, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852, 391, 726, 149, 985, 623, 478, 819, 357, 692, 275, 946, 118, 753, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852, 391, 726, 149, 985, 623, 478, 819, 357, 692, 275, 946, 118, 753, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852, 391, 726, 149, 985, 623, 478, 819, 357, 692, 275, 946, 118, 753, 382, 569, 217, 894, 463, 129, 756, 938, 185, 627, 451, 793, 316, 982, 549, 678, 239, 864, 517, 693, 852,

];



function collectSortMetrics(sortingFunction, array, algorithmName) {
     resetMetrics();

   
    let metrics = sortingFunction(array);

    console.log(algorithmName + " Metrics:", metrics);

    return metrics;
}




let quickComparisons = 0;
let quickSwaps = 0;
let quickIterations = 0;

// Partition function for Quick Sort
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        quickComparisons++; // Count each comparison
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            quickSwaps++; // Increment swap count
        }
        quickIterations++;
    }

    // Move pivot after smaller elements and count the final swap
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    quickSwaps++;

    return i + 1;
}

// QuickSort function
function quickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Function to run and measure performance of Quick Sort
function runQuickSort(arr) {
    // Reset performance metrics
    quickComparisons = 0;
    quickSwaps = 0;
    quickIterations = 0;

    const startTime = performance.now(); // Start time

    quickSort(arr, 0, arr.length - 1);

    const endTime = performance.now(); // End time
    const timeTaken = (endTime - startTime).toFixed(2); // Time taken in milliseconds

    // Output performance metrics
    console.log("Sorted array: " + arr);
    console.log("Comparisons: " + quickComparisons);
    console.log("Swaps: " + quickSwaps);
    console.log("Iterations: " + quickIterations);
    console.log("Time taken (ms): " + timeTaken);
    return {
        comparisons: quickComparisons,    
        swaps: quickSwaps,
        iterations: quickIterations,
        time: timeTaken
    };
}





function updateTable() {
    console.log("hello");
    // Use slice() to create a new array copy
    let bubbleSortData = collectSortMetrics(bblSort, array.slice(), "Bubble Sort");
    let insertionSortData = collectSortMetrics(insertionSort, array.slice(), "Insertion Sort");
    let selectionSortData = collectSortMetrics(selectionSort, array.slice(), "Selection Sort");
    let mergeSortData = collectSortMetrics(runMergeSort, array.slice(), "Merge Sort");
    let quickSortData = collectSortMetrics(runQuickSort, array.slice(), "Quick Sort");
     console.log(mergeSortData);
    // console.log(bubbleSortData);
     //console.log(selectionSortData);

    // Update DOM with the sorting metrics
    document.getElementById('bubble-comparisons').innerHTML = bubbleSortData.comparisons;
    document.getElementById('bubble-time').innerHTML = bubbleSortData.time + ' ms';
    document.getElementById('bubble-swaps').innerHTML = bubbleSortData.swaps;
    document.getElementById('bubble-iterations').innerHTML = bubbleSortData.iterations;

    document.getElementById('insertion-comparisons').innerHTML = insertionSortData.comparisons;
    document.getElementById('insertion-time').innerHTML = insertionSortData.time + ' ms';
    document.getElementById('insertion-swaps').innerHTML = insertionSortData.swaps;
    document.getElementById('insertion-iterations').innerHTML = insertionSortData.iterations;

    document.getElementById('selection-comparisons').innerHTML = selectionSortData.comparisons;
    document.getElementById('selection-time').innerHTML = selectionSortData.time + ' ms';
    document.getElementById('selection-swaps').innerHTML = selectionSortData.swaps;
    document.getElementById('selection-iterations').innerHTML = selectionSortData.iterations;
    // Add similar code for merge and quick sort updates

    document.getElementById('mergesort-comparisons').innerHTML = mergeSortData.comparisons;
    document.getElementById('mergesort-time').innerHTML = mergeSortData.time + ' ms';
    document.getElementById('mergesort-swaps').innerHTML = mergeSortData.copies;
    document.getElementById('mergesort-iterations').innerHTML = mergeSortData.iterations;

   document.getElementById('quicksort-comparisons').innerHTML =  quickSortData.comparisons;
    document.getElementById('quicksort-time').innerHTML =  quickSortData.time + ' ms';
    document.getElementById('quicksort-swaps').innerHTML =  quickSortData.swaps;
    document.getElementById('quicksort-iterations').innerHTML =  quickSortData.iterations;




}

document.addEventListener('DOMContentLoaded', function() {
    updateTable(); // Call the function after the page loads
});

//updateTable();