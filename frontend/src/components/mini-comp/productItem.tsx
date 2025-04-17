import { XSquare } from 'react-feather';

type ItemProps = {
    className?: string;
    image: string;
    imgDesc: string;
    price: number;
    itemDesc: string;
  } & React.HTMLAttributes<HTMLDivElement>;

const Item = ({ className, image, imgDesc, price, itemDesc, ...props }: ItemProps) => {

    return (
        <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
            <img 
                src={image} 
                alt={imgDesc}
                className="w-[160px] h-[160px] text-center border rounded-2xl text-white bg-[var(--bg-navy)]">
            </img>
            <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                <div className="flex justify-between">
                    <h2 className="font-bold">This Product's Name</h2>
                    <XSquare size={22} className="hover:text-red-900"/>
                </div>
                <p><b>$</b> {price}</p>
                <p>{itemDesc}</p>
            </div>
        </div>
    )
}

export default Item;