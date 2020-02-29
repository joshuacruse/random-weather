import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


class LocationsInput extends React.Component {

  state = {
    count: '',
    showModal: false
  }

  onClose = () => {
    this.setState({
      showModal: false
    })
  }

  onCountChange = e => {
    this.setState({
      count: e.target.value
    })
  }

  onGetLocations = e => {
    e.preventDefault()
    if (typeof(parseInt(this.state.count)) === "number" && parseInt(this.state.count) < 50 && parseInt(this.state.count) > 0) {
      this.props.countUpdate(this.state.count)
    }
    else {
      this.setState({
        showModal: true
      })
    }
  }

  render() {
    return (
      <div className="mb-4">

        <Modal show={this.state.showModal} onHide={this.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Invalid Input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Enter a number between 1 and 50.</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Form onSubmit={this.onGetLocations}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Number of Random Locations (1-50)</Form.Label>
            <Form.Control onChange={this.onCountChange} value={this.state.count} type="" placeholder="" />
          </Form.Group>
        </Form>
        <Button onClick={this.onGetLocations} variant="primary" type="submit">Get Locations</Button>
      </div>
    )
  }
}


export default LocationsInput