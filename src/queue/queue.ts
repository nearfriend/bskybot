export type QueueTask = () => Promise<void>

export class SimpleQueue {
  private queue: QueueTask[] = []
  private processing = false

  enqueue(task: QueueTask) {
    this.queue.push(task)
    this.process().catch(() => {
      // Swallow errors here; caller should handle inside task.
    })
  }

  private async process() {
    if (this.processing) {
      return
    }
    this.processing = true

    while (this.queue.length > 0) {
      const task = this.queue.shift()
      if (!task) {
        break
      }

      try {
        await task()
      } catch {
        // Ignore individual task failures here.
      }
    }

    this.processing = false
  }
}
