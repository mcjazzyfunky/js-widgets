import { Ctrl } from '../../../core/main/index'
import px from '../internal/tools/px'

export default function useBoundData<T>(c: Ctrl, getData: () => T): T {
  return px.bindData(getData)
}
