import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DropdownWithSearch from "../../components/Menususp";
import InputDefault from "../../components/InputDefault";
import Label from "../../components/Label";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]); // Para imagens novas
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]); // IDs das imagens a serem deletadas
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [power, setPower] = useState(0);
    const [engine, setEngine] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i); // Lista de anos

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3000/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setModel(data.model);
            setBrand(data.brand);
            setYear(data.year);
            setPower(data.power);
            setEngine(data.engine);
            setDescription(data.description);
            setPrice(data.price);
            setQuantity(data.quantity);
            // Adicionando imagens do produto
            const imagePreviews = data.ProductImages.map(image => image.url);
            setImagePreviews(imagePreviews);
            setImagesToDelete(data.ProductImages.map(image => image.id)); // Supondo que cada imagem tenha um ID
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            model,
            brand,
            year,
            power,
            engine,
            description,
            price,
            quantity,
            images: imagePreviews, // Para o servidor saber que estamos atualizando as imagens
            imagesToDelete // IDs das imagens a serem deletadas
        };

        const response = await fetch(`http://localhost:3000/products/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            navigate('/admin');
        } else {
            console.error('Failed to update product');
        }
    };

    const handleImageChange = (files) => {
        const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...fileArray]);
        setImages(prev => [...prev, ...files]); // Armazene os arquivos se precisar enviar para o servidor
    };

    const removeImage = (index) => {
        const newImages = [...imagePreviews];
        const imageToRemove = newImages[index];
        newImages.splice(index, 1);
        setImagePreviews(newImages);
        
        // Se a imagem já estava no servidor, adicione o ID à lista de imagens a serem deletadas
        if (product.ProductImages[index]?.id) {
            setImagesToDelete(prev => [...prev, product.ProductImages[index].id]);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="m-8 ">
                <Link to='/admin' className="rounded-full bg-red-100 w-8 h-8 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512">
                        <path className="fill-red-600" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                </Link>
            </div>
            <form className="mx-8 sm:mx-20 lg:mx-48 my-16" onSubmit={handleUpdate}>
                <h2 className="text-xl border-b border-red-600 pb-4 font-semibold text-gray-900">
                    Editar Produto
                </h2>
                <div className="grid grid-cols-4 gap-y-6 gap-x-8 mt-4 border-b border-gray-900/10 pb-16">
                    <div className="sm:col-span-4">
                        <Label htmlFor="model" text="Modelo" />
                        <InputDefault
                            onChange={(e) => setModel(e.target.value)}
                            value={model}
                            id="model"
                            name="model"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <Label htmlFor="brand" text="Marca" />
                        <DropdownWithSearch selectedBrand={brand} onSelectBrand={setBrand} />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="engine" text="Motor" />
                        <InputDefault
                            onChange={(e) => setEngine(e.target.value)}
                            value={engine}
                            id="engine"
                            name="engine"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="power" text="Potência" />
                        <InputDefault
                            onChange={(e) => setPower(Number(e.target.value))}
                            value={power}
                            id="power"
                            name="power"
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <Label htmlFor="year" text="Ano" />
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="block outline-none w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm/6"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <Label htmlFor="price" text="Valor" />
                        <InputDefault
                            onChange={(e) => setPrice(Number(e.target.value))}
                            value={price}
                            id="price"
                            name="price"
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <Label htmlFor="quantity" text="Quantidade" />
                        <InputDefault
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            value={quantity}
                            id="quantity"
                            name="quantity"
                        />
                    </div>
                    <div className="col-span-full">
                        <Label htmlFor="description" text="Descrição" />
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm/6"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div className="col-span-full">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Imagens</h2>
                        <div className="flex gap-x-2">
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleImageChange(e.target.files)}
                                className="border-0 text-gray-900 shadow-sm"
                            />
                            <button
                                type="button"
                                className="rounded-md bg-red-600 text-white px-2 py-1"
                                onClick={() => {
                                    setImages([]);
                                    setImagePreviews([]);
                                }}
                            >
                                Remover todas
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {imagePreviews.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image} alt={`preview ${index}`} className="w-full h-full object-cover rounded-md" />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-md"
                                        onClick={() => removeImage(index)}
                                    >
                                        X
                                    </button>
                                    {index === 0 && <span className="absolute top-1 left-1 bg-white text-red-600 px-1">Foto principal</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-4 mt-8">
                    <button type="submit" className="rounded-md bg-red-600 text-white px-4 py-2">
                        Salvar
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditProduct;
