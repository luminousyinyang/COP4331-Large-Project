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
import Dropdown from '@/components/ui/checkbox'; // Replace if outdated

interface OptionsBarProps extends React.ComponentProps<'div'> {
    userId: string;
}

interface FormState {
    productLink: string;
    productName: string;
    productPrice: string;
    productTag: string;
    productDesc: string;
}

const OptionsBar: React.FC<OptionsBarProps> = ({ className, userId, ...props }) => {

    const [imgPreview, setImgPreview] = useState<string | null>("");
    const [open, setOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [form, setForm] = useState<FormState>({
        productLink: '',
        productName: '',
        productPrice: '',
        productTag: '',
        productDesc: '',
    });

    // Saves the file taken from file input, and stores it in imgPreview
    // Shows the image preview 
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImgPreview(previewURL);
        }
    };



    // Debug userId
    useEffect(() => {
        if (!open && imgPreview) {
            URL.revokeObjectURL(imgPreview);
            setImgPreview(null);
        }
        console.log('OptionsBar userId:', userId);
    }, [userId]);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { productLink, productName, productPrice, productTag, productDesc } = form;

        if (!userId || !productLink || !productName || !productPrice || !productDesc) {
            return alert('Please fill in all required fields.');
        }

        const payload = {
            userID: userId,
            tagID: productTag,
            title: productName,
            price: productPrice,
            description: productDesc,
            imageURL: productLink, // Sending the link instead of a file
        };

        try {
            const response = await fetch('/api/item/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Item created successfully!');
                setOpen(false);
                setForm({ productLink: '', productName: '', productPrice: '', productTag: '', productDesc: '' });
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Server error');
        }
    };

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
                    <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
                        <DialogHeader>
                            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3.5">
                                <DialogClose className="absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                                    <X className="w-6 h-6 absolute top-1 right-1.75" />
                                </DialogClose>
                                <DialogTitle className="text-xl font-black text-center">Add Item</DialogTitle>
                                <div className="border border-[var(--bg-navy)]" />

                                {/* Image Preview (Link) */}
                                <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                    id="item-picture"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <img
                                    src={form.productLink || ''}
                                    alt={form.productLink ? 'Product Image' : 'No Image'}
                                    className="w-full h-[120px] object-cover bg-[var(--bg-pale-white)] border border-[var(--bg-navy)] rounded-2xl"
                                />

                                <div>
                                    <h2 className="font-bold">Product Link</h2>
                                    <Input
                                        id="productLink"
                                        type="text"
                                        value={form.productLink}
                                        onChange={handleFormChange}
                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-bold">Name</h2>
                                    <Input
                                        id="productName"
                                        type="text"
                                        value={form.productName}
                                        onChange={handleFormChange}
                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="font-bold">Price</h2>
                                        <Input
                                            id="productPrice"
                                            type="text"
                                            value={form.productPrice}
                                            onChange={handleFormChange}
                                            className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-bold">Tag (Optional)</h2>
                                        <Input
                                            id="productTag"
                                            type="text"
                                            value={form.productTag}
                                            onChange={handleFormChange}
                                            className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-bold">Description</h2>
                                    <Textarea
                                        id="productDesc"
                                        value={form.productDesc}
                                        onChange={handleFormChange}
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
                </Dialog>
            </div>
        </div>
    );
};

// Memoize and export
export const OptionsBarComponent = memo(OptionsBar);
