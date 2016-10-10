// Internal dependencies
import connectExistingBlog from 'components/containers/set-up-domain/connect-existing-blog';
import hosts from 'components/containers/hosts';
import hostInfo from 'components/containers/host-info';
import selectBlogType from 'components/containers/set-up-domain/select-blog-type';
import findExistingBlog from 'components/containers/set-up-domain/find-existing-blog';
import selectNewBlogHost from 'components/containers/set-up-domain/select-new-blog-host';
import setUpConnectOther from 'components/containers/set-up-connect-other';
import setUpConnectWordpress from 'components/ui/set-up-connect/wordpress';

export default {
	connectExistingBlog,
	hosts,
	hostInfo,
	selectBlogType,
	findExistingBlog,
	selectNewBlogHost,
	setUpConnectOther,
	setUpConnectWordpress,
};
