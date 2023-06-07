import html2canvas from 'html2canvas';

export const saveAsImage = async (noteContent, bgColor, textColor, fontSize, fontFamily, bgImage) => {
    // Create an off-screen div to hold the note content
    const noteDiv = document.createElement('div');

    // If a background image was chosen, create an img tag
    if (bgImage) {
        const img = document.createElement('img');
        img.src = bgImage;
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.zIndex = '-1';  // So that the image is behind the note content
        noteDiv.appendChild(img);
    }

    // Create a header
    const header = document.createElement('h1');
    header.innerText = `🏝️ Desert Island Meeting Notes - ${new Date().toLocaleString()}`;
    header.style.fontFamily = `${fontFamily}, sans-serif`;
    header.style.fontSize = fontSize;
    header.style.marginBottom = '1rem';
    noteDiv.appendChild(header);

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = noteContent;
    noteDiv.appendChild(contentDiv);

    // Apply necessary styles
    noteDiv.style.fontFamily = `${fontFamily}, sans-serif`;
    noteDiv.style.fontSize = fontSize;
    noteDiv.style.padding = '1rem';
    noteDiv.style.backgroundColor = bgColor;
    noteDiv.style.color = textColor;
    noteDiv.style.display = 'inline-block';

    // Append the div to the body (it won't be visible on the page)
    document.body.appendChild(noteDiv);

    // Use html2canvas to take a screenshot
    try {
        const canvas = await html2canvas(noteDiv, { backgroundColor: null });
        const imgData = canvas.toDataURL('image/png');

        // Return the data URL of the screenshot image
        return imgData;

    } catch (err) {
        console.error('Failed to generate image:', err);
    } finally {
        // Clean up the off-screen div
        document.body.removeChild(noteDiv);
    }
};
