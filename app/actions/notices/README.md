# Notices

We use notices to show a message to users when something changes in the state of the application, but not as a direct consequence of a user's action; for example an error from the API, or a successful domain purchase.

## Format

Notices are of the following form:

```javascript
{
	id: '1' // Automatically generated when you add a notice
	message: 'Message' // Some text
	status: 'error|warning|success' // The type of the notice
}
```

## Usage

To add a notice:

```javascript
import { addNotice } from 'actions/notices';

dispatch( addNotice( {
	message: 'Something bad happened',
	status: 'error'
} ) );
```
