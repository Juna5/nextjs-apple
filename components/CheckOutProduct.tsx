import Image from "next/image";
import { urlFor } from "../sanity";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/basketSlice";
import toast from "react-hot-toast";
interface Props {
    items: Product[];
    id: string;
}

export default function CheckOutProduct({ id, items }: Props) {
    const dispacth = useDispatch();

    const removeItemFromBasket = () => {
        dispacth(removeFromBasket({ id }));

        toast.error(`${items[0].title} removed from basket`, {
            position: "bottom-center",
        });
    };

    return (
        <div className="flex flex-col gap-x-4 border-b border-gray-300 py-5 lg:flex-row lg:items-center">
            <div className="relative h-44 w-44">
                <Image
                    src={urlFor(items[0].image[0]).url()}
                    layout="fill"
                    objectFit="contain"
                    alt="fo"
                />
            </div>
            <div className="flex flex-1 items-end lg:items-center">
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
                        <h4 className="font-semibold lg:w-96">
                            {items[0].title}
                        </h4>
                        <p className="flex items-end gap-x-1 font-semibold">
                            {items.length}
                            <ChevronDownIcon className="h-6 w-6 text-blue-500" />
                        </p>
                    </div>
                    <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Show product details
                        <ChevronDownIcon className="h-6 w-6 " />
                    </p>
                </div>
                <div className="flex flex-col items-end space-x-4">
                    <h4 className="text-xl font-semibold lg:text-2xl">
                        <NumericFormat
                            value={items.reduce(
                                (total, item) => total + item.price,
                                0
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                        />
                    </h4>
                    <button
                        onClick={removeItemFromBasket}
                        className="text-blue-500 hover:underline"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
