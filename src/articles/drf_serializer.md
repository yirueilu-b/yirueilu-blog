# Django REST Framework - Serializers

![](https://i.imgur.com/wmsjgHa.png)

This article is a brief note about basic DRF serializers (`Serializers` and `ModelSerializer`)

## Create A Simple Article Model

First, we need to create a simple model for performing following serializer operations

- In the `models.py` of the django app, create the `Article` as below

    ```python
    class Article(models.Model):
        title = models.CharField(max_length=100)
        author = models.CharField(max_length=100)
        email = models.EmailField(max_length=100)
        date = models.DateField(auto_now_add=True)

        def __str__(self):
            return self.title
    ```

- Make migrations to create table in database
    `python manage.py makemigrations`
    `python manage.py migrate`

## Serializers

>`serializers` allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types.

In short, `serializers` is for converting data between instance and other data type such as JSONm XML.

Let's create a simple serializer for `Article` and use Django shell to see what happend.

- Create `serializers.py` in the Django APP and add below code
    ```python
    from rest_framework import serializers
    from .models import Article


    class ArticleSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)
        author = serializers.CharField(max_length=100)
        email = serializers.EmailField(max_length=100)
        date = serializers.DateField()

        def create(self, validated_data):
            return Article.objects.create(validated_data)

        def update(self, instance, validated_data):
            instance.title = validated_data.get('title', instance.title)
            instance.author = validated_data.get('author', instance.author)
            instance.email = validated_data.get('email', instance.email)
            instance.date = validated_data.get('date', instance.date)
            instance.save()
            return instance
    ```
    
- Start a Django shell
    `python manage.py shell`

- Import dependencies
    ```python
    from snippets.models import Snippet
    from snippets.serializers import SnippetSerializer
    from rest_framework.renderers import JSONRenderer
    from rest_framework.parsers import JSONParser
    ```
- Create a new `Article` instance
    ```python
    a = Article(title='test title', author='test author', email='test_email@email.com')`
    a.save()
    ```

- Use `serializer` to serialize the instance `a`
    ```python
    serializer = ArticleSerializer(a)
    serializer.data
    ```
    
    output:
    
    `{'title': 'test title', 'author': 'test author', 'email': 'test_email@email.com', 'date': '2021-07-26'}`
    
    The instance `a` is converted to Python native data type `dict` by `serializer`
    
- Use `JSONRenderer` to render this dictionary to JSON
    ```python
    content = JSONRenderer().render(serilaizer.data)
    content
    ```
    
    output:
    
    `b'{"title":"test title","author":"test author","email":"test_email@email.com","date":"2021-07-26"}'`

- Serializers could also serialize a `QuerySet` (multiple instances)
    ```python
    queryset = Article.objects.all()
    serializer = ArticleSerializer(queryset, many=True)
    serializer.data
    ```
    
    output:
    
    ```
    [OrderedDict([('title', 'test title'), ('author', 'test author'), ('email', 'test_email@email.com'), ('date', '2021-07-26')]), OrderedDict([('title', 'test title 2'), ('author', 'test author 2'), ('email', 'test_email_2@email.com'), ('date', '2021-07-26')])]
    ```

## Model Serializer

> The ModelSerializer class provides a shortcut that lets you automatically create a Serializer class with fields that correspond to the Model fields.
`ModelSerializer` is for simplifying the code of a `Serializers`, it provide
- default implementation of `create()` and `update()`
- auto generate all fields based on the model
- auto generate validators for the serializer

Let's use `ModelSerializer` instead of original `serializers`

- Modify the `ArticleSerializer`
    ```python
    class ArticleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ['id', 'title', 'author']
    ```

- Restart the shell and import `ArticleSerializer`
    ```python
    from member.serializers import ArticleSerializer
    serializer = ArticleSerializer()
    print(repr(serializer))
    ```

    output:

    ```python
    ArticleSerializer():
        id = IntegerField(label='ID', read_only=True)
        title = CharField(max_length=100)
        author = CharField(max_length=100)
    ```
    
- Could also perform all the operations mentioned in previous `Serializers` section

## Conclusion

In DRF, serializer is just for converting data between instances and different data types such as JSON and XML.

Original serializer class is replicating a lot of information that's also contained in the model so DRF provide `ModelSerializer` make the code more concise

## Reference

[DRF API Guide](https://www.django-rest-framework.org/api-guide/serializers/#serializers)
[Django REST Framework Full Course For Beginners | Build REST API With Django](https://www.django-rest-framework.org/api-guide/serializers/#serializers)