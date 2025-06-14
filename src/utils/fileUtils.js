
const isValidFile = (file) => {
    return file && file.type.startsWith("image/") && file.size <= 500 * 1024;
};

export const processFile = (file) => {
    return new Promise((resolve, reject) => {
        if (isValidFile(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.onerror = () => {
                reject("Errore nella lettura del file")
            };
            reader.readAsDataURL(file);
        } else {
            reject("File too large. Please upload a photo under 500kb")
        }
    })
};

