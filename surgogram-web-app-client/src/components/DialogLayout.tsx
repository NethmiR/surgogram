import React, { Fragment } from "react";
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
} from "@headlessui/react";

interface DialogLayoutProps {
    isVisible: boolean;
    children: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({ isVisible, children }) => {
    return (
        <Transition appear show={isVisible} as={Fragment}>
            <Dialog
                as="div"
                open={isVisible}
                onClose={() => { }}
                className="fixed z-50 inset-0 overflow-y-auto flex flex-row items-center justify-center backdrop-blur-sm"
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-30"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-30"
                    leaveTo="opacity-0"
                >
                    <DialogPanel className="fixed inset-0 bg-black opacity-30" />
                </TransitionChild>

                <div className="w-[350px] sm:w-[550px] fixed inset-0 flex items-center justify-center mx-auto">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-50"
                        leaveTo="opacity-0"
                    >
                        <DialogPanel
                            as="div"
                            className="w-full relative z-50 bg-black bg-opacity-70 backdrop-blur-sm border border-blue-primary border-opacity-60 rounded-xl pt-5 px-7 pb-5 text-black"
                        >
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DialogLayout;
