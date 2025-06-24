// Service Worker: show push notifications
self.addEventListener('push', event => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/assets/planet-earth.png',  // fallback icon
    image: data.image  // large image if provided
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})