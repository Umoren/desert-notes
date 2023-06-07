// components/NoteEditor.js
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { BlockPicker } from 'react-color';
import { saveAsImage } from "../utils/screenshotHelper";

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px'];
const fontFamilies = [
    'Inter', 'Roboto', 'Arial', 'Courier New', 'Georgia', 'Times New Roman',
    'Comic Sans MS', 'Impact', 'Brush Script MT', 'Papyrus', 'Jazz LET',
    'Chalkduster', 'Marker Felt', 'Baskerville', 'Futura', 'Gill Sans',
    'Verdana', 'Palatino', 'Garamond', 'Lucida Sans', 'Helvetica'
];


const NoteEditor = () => {
    const editorRef = useRef(null);
    const [imgDataUrl, setImgDataUrl] = useState(null);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [fontSize, setFontSize] = useState('14px');
    const [fontFamily, setFontFamily] = useState('Inter');

    const handleSave = async () => {
        if (editorRef.current) {
            const editorContent = editorRef.current.getContent();
            const imgDataUrl = await saveAsImage(editorContent, bgColor, textColor, fontSize, fontFamily);
            setImgDataUrl(imgDataUrl);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="mb-4 text-gray-800">
                <h2 className="text-xl font-bold">What do you note today?</h2>
                <p className="text-sm">{new Date().toLocaleString()}</p>
            </div>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                apiKey={process.env.REACT_APP_TINY_KEY}
                initialValue=""
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount casechange",
                    ],
                    toolbar: `undo redo | formatselect |
                     bold italic underline fontsize backcolor fontfamily | alignleft aligncenter
                     alignright alignjustify | bullist numlist outdent indent |
                     removeformat | help`,
                    font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                    // font_family_formats:
                    toolbar_sticky: true,
                    content_style: `body { font-family:${fontFamily}, sans-serif; font-size:${fontSize}; color:${textColor}; }`
                }}
            />

            <h2 className="text-xl font-semibold my-4"> Download Options: </h2>
            <div className="md:flex space-y-4 sm:space-x-4 sm:space-y-0 mt-4">

                <div>
                    <h4 className="text-sm mb-2">Background Color:</h4>
                    <BlockPicker color={bgColor} onChangeComplete={(color) => setBgColor(color.hex)} />
                </div>
                <div>
                    <h4 className="text-sm mb-2">Text Color:</h4>
                    <BlockPicker color={textColor} onChangeComplete={(color) => setTextColor(color.hex)} />
                </div>

            </div>


            <div className="hidden flex-col space-y-4 my-8 border-y-2 py-4">
                <div>
                    <h3 className="text-lg mb-2">Font Size:</h3>
                    <select value={fontSize} onChange={e => setFontSize(e.target.value)}>
                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </div>
                <div className="hidden md:block">
                    <h3 className="text-lg mb-2">Font Family:</h3>
                    <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                        {fontFamilies.map(family => <option key={family} value={family}>{family}</option>)}
                    </select>
                </div>
            </div>
            <button
                className="mt-4 px-4 py-2 rounded text-white bg-black hover:bg-gray-800"
                onClick={handleSave}
            >
                Save as Image
            </button>

            {imgDataUrl && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-xl font-bold mb-4">Preview</h2>
                        <img src={imgDataUrl} alt="Preview" className="mb-4" />
                        <button
                            className="px-4 py-2 rounded text-white bg-black hover:bg-gray-800"
                            onClick={() => {
                                const link = document.createElement('a');
                                link.download = `note_${new Date().toISOString()}.png`;
                                link.href = imgDataUrl;
                                link.click();
                                setImgDataUrl(null);  // Close the modal after downloading
                            }}
                        >
                            Download
                        </button>
                        <button
                            className="px-4 py-2 rounded text-black bg-gray-200 hover:bg-gray-300 ml-4"
                            onClick={() => setImgDataUrl(null)}  // Close the modal without downloading
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteEditor;
