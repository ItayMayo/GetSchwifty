export class ElementOperations {
    
    createElement(tag, className) 
    {
        const element = document.createElement(tag);

        if (className) 
        {
            element.classList.add(className);
        }

        return element;
    }

    getElement(selector) 
    {
        const element = document.querySelector(selector);

        return element;
    }
}