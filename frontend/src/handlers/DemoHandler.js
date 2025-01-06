import { AppState } from '../AppState.js'
import api from '../services/AxiosService.js'

class DemoHandler {
  async getDemos() {
    const res = await api.get('api/demos')
    AppState.demos = res.data
  }

  async getDemoById(id) {
    const res = await api.get(`api/demos/${id}`)
    AppState.activeDemo = res.data
  }
}

export const demoHandler = new DemoHandler()
