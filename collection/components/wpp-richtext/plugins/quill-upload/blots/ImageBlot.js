import { Constants } from '../utils'
import MediaBlot from './MediaBlot'

class ImageBlot extends MediaBlot {}

ImageBlot.blotName = Constants.blots.image
ImageBlot.tagName = 'img'

export default ImageBlot
