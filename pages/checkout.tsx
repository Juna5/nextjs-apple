import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Head from "next/head";
import { useSelector } from "react-redux";
import Stripe from "stripe";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import { Router, useRouter } from "next/router";
import CheckOutProduct from "../components/CheckOutProduct";
import Button from "../components/Button";
import { NumericFormat } from "react-number-format";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { fetchPostJSON } from "./api/api-helpers";

export default function Checkout() {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const router = useRouter();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
        {} as { [key: string]: Product[] }
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item._id] = results[item._id] || []).push(item);
            return results;
        }, {} as { [key: string]: Product[] });
        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    const checkoutSession = async () => {
        setLoading(true);

        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
            "/api/checkout_sessions",
            { items: items }
        );

        if ((checkoutSession as any).statusCode === 500) {
            console.error((checkoutSession as any).message);
            return;
        }

        // const stripe = await getEffectiveConstraintOfTypeParameter()
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
            <Head>
                <title>Bag - Apple</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="mx-auto max-w-5xl pb-24">
                <div className="px-5">
                    <h1 className="my-4 text-xl font-semibold lg:text-4xl">
                        {items.length > 0
                            ? "Review your bag."
                            : "Your bag is empty"}
                    </h1>
                    <p className="my-4">Free delivery amd free returns.</p>
                    {items.length === 0 && (
                        <Button
                            title="Continue Shopping"
                            onClick={() => router.push("/")}
                        />
                    )}
                </div>
                {items.length > 0 && (
                    <div className="mx-5 md:mx-8">
                        {Object.entries(groupedItemsInBasket).map(
                            ([key, items]) => [
                                <CheckOutProduct
                                    key={key}
                                    items={items}
                                    id={key}
                                />,
                            ]
                        )}
                        <div className="my-12 mt-6 ml-auto max-w-3xl">
                            <div className="divide-y divide-gray-300">
                                <div className="pb-4">
                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        <p>
                                            <NumericFormat
                                                value={basketTotal}
                                                prefix={"Rp. "}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                            />
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Shipping</p>
                                        <p>FREE</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-x-1 lg:flex-row">
                                            Estimated tax for:{" "}
                                            <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                                                Enter zip code
                                                <ChevronDownIcon className="h-6 w-6" />
                                            </p>
                                        </div>
                                        <p>Rp. -</p>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4 font-semibold">
                                    <h4>Total</h4>
                                    <h4>
                                        <NumericFormat
                                            value={basketTotal}
                                            prefix={"Rp. "}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </h4>
                                </div>
                            </div>
                            <div className="my-14 space-y-4">
                                <h4 className="text-xl font-semibold">
                                    How would you like to check out?
                                </h4>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                                        <h4 className="mb-4 flex flex-col text-xl font-semibold">
                                            <span>Pay Monthly</span>
                                            <span>with Apple Card</span>
                                            <span>
                                                Rp. 850.000/mo. at 0% APR
                                                <sup className="-top-1">⎛⎞</sup>
                                            </span>
                                        </h4>
                                        <Button title="Check Out with Apple Card Monthly Installments" />
                                        <p className="mt-2 max-w-[240px] text-[13px]">
                                            Rp. 0 due today, which includes
                                            applicable full-price item, down
                                            payments, shipping, and taxes.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                                        <h4 className="mb-4 flex flex-col text-xl font-semibold">
                                            Pay in Full
                                            <span>
                                                <NumericFormat
                                                    value={basketTotal}
                                                    prefix={"Rp. "}
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                />
                                            </span>
                                        </h4>
                                        <Button title="Check Out" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}