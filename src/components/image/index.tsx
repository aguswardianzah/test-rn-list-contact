import React, { useEffect, useState } from 'react'
import { Image as ImageLib, type ImageURISource, type ImageProps } from 'react-native'

const Image = (props: ImageProps): React.ReactNode => {
	const [valid, setValid] = useState(true)

	useEffect(() => {
		const uri = (props.source as ImageURISource).uri
		if (uri) {
			ImageLib.getSize(
				uri,
				_ => {},
				_ => { setValid(false) }
			)
		} else if (uri === '') {
			setValid(false)
		}
	}, [])

	if (valid) return <ImageLib
		{ ...props }
		onError={ () => { setValid(false) } }
	/>

	return (
		<ImageLib
			{ ...props }
			source={{ uri: `https://ui-avatars.com/api/?name=N.A&size=160` }}
		/>
	)
}

export default React.memo(Image)