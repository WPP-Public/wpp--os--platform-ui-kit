import Tooltip from 'quill/ui/tooltip'

class CustomTooltip extends Tooltip {
  position(reference) {
    let left = reference.left + reference.width / 2 - this.root.offsetWidth / 2
    let top = reference.bottom + this.quill.root.scrollTop

    const containerBounds = this.boundsContainer.getBoundingClientRect()
    const tooltipHeight = this.root.offsetHeight
    const spaceBelow = containerBounds.bottom - reference.bottom
    const spaceAbove = reference.top - containerBounds.top

    if (spaceBelow >= tooltipHeight) {
      this.root.style.top = `${top}px`
      this.root.classList.remove('ql-flip')
    } else if (spaceAbove >= tooltipHeight) {
      top = reference.top + this.quill.root.scrollTop - tooltipHeight
      this.root.style.top = `${top}px`
      this.root.classList.add('ql-flip')
    } else {
      this.root.style.top = `${top}px`
      this.root.classList.remove('ql-flip')
    }

    this.root.style.left = `${left}px`

    let rootBounds = this.root.getBoundingClientRect()
    let shift = 0

    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right
      left += shift
      this.root.style.left = `${left}px`
    }

    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left
      left += shift
      this.root.style.left = `${left}px`
    }
  }
}

export default CustomTooltip
