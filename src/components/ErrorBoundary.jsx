import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, background: '#300', color: 'white' }}>
          <h2>💥 Ett fel inträffade i appen</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
