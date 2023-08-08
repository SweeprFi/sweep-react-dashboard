import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

const SelectBox = (props) => {
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    // const isDevMode = Number(process.env.REACT_APP_MODE) === 0;
    const isDevMode = true;

    return (
        <Listbox value={props.val} onChange={props.setVal}>
            {({ open }) => (
                <>
                    {
                        props.title !== "" && (
                            <Listbox.Label className="block text-sm md:text-base font-medium leading-6 text-white mb-2">{props.title}</Listbox.Label>
                        )
                    }
                    <div className="relative">
                        <Listbox.Button className={`relative w-full rounded-md bg-white py-1.5 md:py-2 pl-3 pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none text-sm md:text-base leading-6 ${props.pending ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
                            <span className="flex items-center">
                                <img src={props.val?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                {
                                    !props.onlyIcon && (
                                        <span className="ml-3 block truncate">{props.val.name}</span>
                                    )
                                }
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                {
                                    open ? (
                                        <ChevronUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    )
                                }
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open && !props.pending}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className={`absolute right-0 z-10 mt-1 max-h-56 ${props.onlyIcon ? isDevMode ? 'w-48' : 'w-36' : 'w-full'} overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                                {props.data.map((item, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'bg-app-blue text-white' : 'text-black',
                                                'relative cursor-pointer select-none py-2 pl-3 pr-3'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <img src={item?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-app-blue',
                                                            'absolute -top-1 inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default SelectBox;