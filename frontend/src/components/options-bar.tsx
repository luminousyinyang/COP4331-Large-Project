import { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Filter, PlusSquare, Search, X } from 'react-feather';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import Dropdown from '@/components/ui/checkbox';

// Props interface for OptionsBar
interface OptionsBarProps extends React.ComponentProps<'div'> {
    userId: string;
    onItemAdded?: (item: Item) => void;
}

// Form data structure
interface FormState {
    productLink: string;
    productName: string;
    productPrice: string;
    productTag: string;
    productDesc: string;
}

// Image state structure
interface ImageState {
    file: File | null;
    preview: string | null;
    source: 'scraped' | 'uploaded' | null;
}

// Item interface (has to match with Item interface form parent)
interface Item {
    _id: string;
    userID: string;
    title: string;
    price: number; // Changed to number
    description: string;
    imageURL: string;
    tag?: string;
}

// Form component
const AddItemForm: React.FC<{
    userId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onItemAdded?: (item: Item) => void;
}> = ({ userId, open, setOpen, onItemAdded }) => {
    const [form, setForm] = useState<FormState>({
        productLink: '',
        productName: '',
        productPrice: '',
        productTag: '',
        productDesc: '',
    });
    const [image, setImage] = useState<ImageState>({
        file: null,
        preview: null,
        source: null,
    });

    // Handle form field updates
    const handleInputChange = (id: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    // Handle file upload with validation
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert('File size exceeds 10MB limit.');
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Only JPEG and PNG files are allowed.');
                return;
            }
            const previewURL = URL.createObjectURL(file);
            setImage({ file, preview: previewURL, source: 'uploaded' });
        }
    };

    // Fetch product metadata
    useEffect(() => {
        const fetchProductInfo = async () => {
            if (!form.productLink) {
                setImage({ file: null, preview: null, source: null });
                setForm((prev) => ({ ...prev, productName: '', productDesc: '' }));
                return;
            }

            try {
                const response = await fetch('/api/item/getprodinfo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: form.productLink }),
                });

                const data = await response.json();
                if (response.ok && data.info.image && !image.file) {
                    setImage({ file: null, preview: data.info.image, source: 'scraped' });
                    setForm((prev) => ({
                        ...prev,
                        productName: data.info.title || '',
                        productDesc: data.info.description || '',
                    }));
                } else {
                    setImage((prev) => (prev.source === 'scraped' ? { file: null, preview: null, source: null } : prev));
                    setForm((prev) => ({ ...prev, productName: '', productDesc: '' }));
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setImage((prev) => (prev.source === 'scraped' ? { file: null, preview: null, source: null } : prev));
                setForm((prev) => ({ ...prev, productName: '', productDesc: '' }));
            }
        };

        fetchProductInfo();
    }, [form.productLink, image.file]);

    // Cleanup object URLs
    useEffect(() => {
        return () => {
            if (image.preview && image.source === 'uploaded') {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image.preview, image.source]);

    useEffect(() => {
        if (!open && image.preview && image.source === 'uploaded') {
            URL.revokeObjectURL(image.preview);
            setImage({ file: null, preview: null, source: null });
        }
    }, [open, image]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { productLink, productName, productPrice, productTag, productDesc } = form;

        if (!userId || !productName || !productPrice || !productDesc || !productLink) {
            return alert('Please fill in all required fields.');
        }

        if (!image.preview) {
            return alert('An image is required. Please upload an image or ensure the product link provides one.');
        }

        const priceValue = parseFloat(productPrice);
        if (isNaN(priceValue) || priceValue < 0) {
            return alert('Please enter a valid price.');
        }

        const formData = new FormData();
        formData.append('userID', userId);
        formData.append('title', productName);
        formData.append('price', priceValue.toString());
        formData.append('description', productDesc);
        formData.append('tag', productTag || '');
        if (image.source === 'uploaded' && image.file) {
            formData.append('image', image.file);
        } else if (image.source === 'scraped' && image.preview) {
            formData.append('imageURL', image.preview);
        }

        try {
            const response = await fetch('/api/item/create', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setOpen(false);
                setForm({
                    productLink: '',
                    productName: '',
                    productPrice: '',
                    productTag: '',
                    productDesc: '',
                });
                setImage({ file: null, preview: null, source: null });
                // Notify parent with the new item
                if (onItemAdded && data.item) {
                    onItemAdded(data.item);
                }
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Server error');
        }
    };

    return (
        <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
            <DialogHeader>
                <form onSubmit={handleSubmit} className="relative flex flex-col gap-3.5">
                    <DialogClose className="absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                        <X className="w-6 h-6 absolute top-1 right-1.75" />
                    </DialogClose>
                    <DialogTitle className="text-xl font-black text-center">Add Item</DialogTitle>
                    <div className="border border-[var(--bg-navy)]" />
                    <div>
                        <Input
                            id="item-picture"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleImageChange}
                            className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                        />
                        {image.preview ? (
                            <img
                                src={image.preview}
                                alt="Product Image"
                                className="w-full h-[120px] object-cover bg-[var(--bg-pale-white)] border border-[var(--bg-navy)] rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-[120px] flex items-center justify-center bg-[var(--bg-pale-white)] border border-[var(--bg-navy)] rounded-2xl">
                                {form.productLink && !image.preview
                                    ? 'No image found. Please upload an image.'
                                    : 'No image selected.'}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="font-bold">Product Link</h2>
                        <Input
                            id="productLink"
                            type="text"
                            value={form.productLink}
                            onChange={(e) => handleInputChange('productLink', e.target.value)}
                            className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                        />
                    </div>
                    <div>
                        <h2 className="font-bold">Name</h2>
                        <Input
                            id="productName"
                            type="text"
                            value={form.productName}
                            onChange={(e) => handleInputChange('productName', e.target.value)}
                            className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-bold">Price</h2>
                            <Input
                                id="productPrice"
                                type="number"
                                step="0.01"
                                value={form.productPrice}
                                onChange={(e) => handleInputChange('productPrice', e.target.value)}
                                className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                            />
                        </div>
                        <div>
                            <h2 className="font-bold">Tag (Optional)</h2>
                            <Input
                                id="productTag"
                                type="text"
                                value={form.productTag}
                                onChange={(e) => handleInputChange('productTag', e.target.value)}
                                className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold">Description</h2>
                        <Textarea
                            id="productDesc"
                            value={form.productDesc}
                            onChange={(e) => handleInputChange('productDesc', e.target.value)}
                            className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] w-full h-[120px]"
                        />
                    </div>
                    <div className="flex justify-between">
                        <DialogClose className="w-[125px] h-[37px] flex justify-center items-center">
                            Cancel
                        </DialogClose>
                        <button
                            type="submit"
                            className="w-[125px] h-[37px] flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </DialogHeader>
        </DialogContent>
    );
};

const OptionsBar: React.FC<OptionsBarProps> = ({ className, userId, onItemAdded, ...props }) => {
    const [open, setOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    return (
        <div className={cn('flex flex-col gap-3 w-[780px]', className)} {...props}>
            <h2 className="text-3xl font-black text-[var(--bg-navy)]">My Wishlist</h2>
            <div className="flex justify-between">
                <form className="relative w-[364px]">
                    <Input
                        className="bg-[var(--bg-pale-white)] shadow-[5px_5px_5px_rgba(0,0,0,0.3)] px-8"
                        id="search"
                        type="text"
                        placeholder="Search"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                    <Search size={22} className="absolute top-1.5 right-3" />
                </form>
                <div className="relative hover:scale-110 transition-all duration-400">
                    <Dropdown
                        text="Filter"
                        style="w-[155px] flex justify-start text-white shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"
                        size="w-39 max-h-100"
                    />
                    <Filter size={22} color="white" className="absolute top-1.5 right-3" />
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <div className="relative hover:scale-110 transition-all duration-400">
                        <DialogTrigger
                            disabled={!userId}
                            className="w-[155px] h-[37px] flex justify-start items-center text-white shadow-[5px_5px_5px_rgba(0,0,0,0.3)] disabled:opacity-50"
                        >
                            Add
                            <PlusSquare size={22} color="white" className="absolute top-2 right-3" />
                        </DialogTrigger>
                    </div>
                    <AddItemForm userId={userId} open={open} setOpen={setOpen} onItemAdded={onItemAdded} />
                </Dialog>
            </div>
        </div>
    );
};

export const OptionsBarComponent = memo(OptionsBar);
