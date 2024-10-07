export const usePosition = () => {
    const isScrollable = function (el: HTMLElement | null): boolean {
        if (el) {
            const hasScrollableContent = el.scrollHeight > el.clientHeight;
            const overflowYStyle = window.getComputedStyle(el).overflowY;
            const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;
    
            return hasScrollableContent && !isOverflowHidden;
        }
        return false; // Trả về false khi không có phần tử
    };
    
    const getScrollableParent = function (el: HTMLElement | null): Window | HTMLElement {
        // Kiểm tra nếu el là null, hoặc là document.body, hoặc là một tài liệu đoạn
        if (!el || el === document.body || el.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            return window;
        }
    
        // Kiểm tra nếu phần tử hiện tại có thể cuộn
        if (isScrollable(el)) {
            return el;
        }
    
        // Nếu không, tìm phần tử cha
        return getScrollableParent((el.assignedSlot ? el.assignedSlot.parentNode : el.parentNode) as HTMLElement);
    };
    return {
        getScrollableParent
    }
}