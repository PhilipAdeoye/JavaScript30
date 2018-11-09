(function () {

    'use strict';

    

    const items = document.querySelectorAll(".item");

    const checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"));
    let selectedCheckBoxes = [];
    
    /**
     * 
     * @param {PointerEvent} e 
     */
    function handleCBClick(e) {

        const seqId = parseInt(this.dataset.sequence, 10);

        if(!this.checked) {
            let thisCBIndex = selectedCheckBoxes.findIndex(cb => cb.dataset.sequence == seqId);
            if(thisCBIndex !== -1) {
                selectedCheckBoxes.splice(thisCBIndex, 1);
            }
            return;
        }        

        const shiftKeyUsed = e.shiftKey;        

        let lastSelectedCBSeqId = null;
        const lastSelectedCB = selectedCheckBoxes[selectedCheckBoxes.length -1];

        if (lastSelectedCB) {
            lastSelectedCBSeqId = parseInt(lastSelectedCB.dataset.sequence, 10);
        }

        if (shiftKeyUsed && lastSelectedCBSeqId !== null) {
            let checkboxesToCheck = [];
            if (lastSelectedCBSeqId < seqId) {
                checkboxesToCheck.push(...checkboxes.slice(lastSelectedCBSeqId + 1, seqId));
            } else {
                checkboxesToCheck.push(...checkboxes.slice(seqId + 1, lastSelectedCBSeqId).reverse());
            }

            checkboxesToCheck.forEach(cb => {                
                cb.checked = true;
                if(selectedCheckBoxes.findIndex(check => check.dataset.sequence === cb.dataset.sequence) === -1) {
                    selectedCheckBoxes.push(cb);
                }
            });
            
        }  
        
        selectedCheckBoxes.push(this);        
    }

    // Give each checkbox a sequence number
    checkboxes.forEach((cb, index) => cb.dataset.sequence = index);

    checkboxes.forEach(cb => cb.addEventListener('click', handleCBClick));

    


})();