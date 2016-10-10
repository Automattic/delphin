// Internal dependencies
import connectExistingBlog from 'components/containers/set-up-domain/connect-existing-blog';
import connectingExistingBlog from 'components/containers/set-up-domain/connecting-existing-blog';
import hosts from 'components/containers/hosts';
import hostInfo from 'components/containers/host-info';
import selectBlogType from 'components/containers/set-up-domain/select-blog-type';
import findExistingBlog from 'components/containers/set-up-domain/find-existing-blog';
import selectNewBlogHost from 'components/containers/set-up-domain/select-new-blog-host';
import connectNewBlogToOther from 'components/containers/set-up-domain/connect-new-blog-to-other';
import connectNewBlogToWordpress from 'components/ui/set-up-domain/connect-new-blog/wordpress';

export default {
	connectExistingBlog,
	connectingExistingBlog,
	connectNewBlogToOther,
	connectNewBlogToWordpress,
	findExistingBlog,
	hostInfo,
	hosts,
	selectBlogType,
	selectNewBlogHost,
};
