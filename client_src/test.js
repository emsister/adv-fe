$( document ).ready( function () {
    var posts = Data.getPosts();

        
    var postsJSONTemplateRaw = $('#posts-json-template').html();
    var postsJSONTemplate = Handlebars.compile(postsJSONTemplateRaw);

    var postsTemplateRaw = $('#posts-list-template').html();
    var postsTemplate = Handlebars.compile(postsTemplateRaw);
    
    
	Handlebars.registerHelper('toJSON', function(object){
		return new Handlebars.SafeString(JSON.stringify(object.data.root.posts, null, '    '));
	});

	Handlebars.registerHelper('stripePosts', function (posts, fn) {

        var buffer = [],
            i, len;
        
        for (i = 0, len = posts.length; i < len; ++i) {
            var row = posts[i];
            row.cls = (i + 1) % 2 === 0 ? 'even' : 'odd';

            // Render the block once for each row.
            buffer.push(fn.fn(row));
        }
        
        return buffer.join('');
    });
        
    renderJSON();
    renderPosts();
       
    function renderJSON() {
        
        html= postsJSONTemplate(
           {posts: posts}
        );
        

        jQuery('.json').html(html);
    }

    function renderPosts() {
        
        html= postsTemplate(
           {posts: posts}
        );

        jQuery('.posts-container__list').html(html);
    }
});

