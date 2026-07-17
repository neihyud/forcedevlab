export const scrollToElement = (pageElement: HTMLElement, padding?: number) => {
  let positionY = 0;

  while (pageElement != null) {
    positionY += pageElement.offsetTop;
    pageElement = pageElement.offsetParent as HTMLElement;
    window.scrollTo({
      behavior: "smooth",
      top: positionY - (padding ?? 0),
    });
  }
};
