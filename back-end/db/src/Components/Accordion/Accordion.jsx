import { Disclosure } from "@headlessui/react";

function Accordion({title, children, handleClick}) {
  return (
    <Disclosure defaultOpen>
      <Disclosure.Button className="py-2" onClick={handleClick}>
        {title}
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
        {children}
      </Disclosure.Panel>
    </Disclosure>
  );
}

export default Accordion
