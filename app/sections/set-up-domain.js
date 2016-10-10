// Internal dependencies
import connectExistingBlog from 'components/containers/set-up-domain/connect-existing-blog';
import connectingExistingBlog from 'components/containers/set-up-domain/connecting-existing-blog';
import connectingNewBlog from 'components/containers/set-up-domain/connecting-new-blog';
import hosts from 'components/containers/hosts';
import hostInfo from 'components/containers/host-info';
import selectBlogType from 'components/containers/set-up-domain/select-blog-type';
import findExistingBlog from 'components/containers/set-up-domain/find-existing-blog';
import selectNewBlogHost from 'components/containers/set-up-domain/select-new-blog-host';
import connectNewBlogToOther from 'components/containers/set-up-domain/connect-new-blog-to-other';

export default {
	connectExistingBlog,
	connectingExistingBlog,
	connectingNewBlog,
	connectNewBlogToOther,
	findExistingBlog,
	hostInfo,
	hosts,
	selectBlogType,
	selectNewBlogHost,
};
